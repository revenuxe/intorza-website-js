import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Loader2, CalendarIcon, MapPin, Play, RefreshCw, CheckCircle, XCircle, Clock, Sparkles } from 'lucide-react';
import { format, isSameDay, addDays, parseISO } from 'date-fns';
import { cityBlogStrategies, getCityBlogStrategy, type CityBlogTopic } from '@/data/cityBlogStrategy';

interface ScheduledPost {
  id: string;
  topic: string;
  keywords: string | null;
  target_audience: string | null;
  target_city: string | null;
  target_country: string | null;
  scheduled_date: string;
  status: 'pending' | 'generating' | 'published' | 'failed';
  blog_post_id: string | null;
  error_message: string | null;
  created_at: string;
}

const AdminScheduler = () => {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    targetAudience: 'interior designers, architects, contractors',
    targetCity: '',
  });

  const [suggestedTopics, setSuggestedTopics] = useState<CityBlogTopic[]>([]);

  const { user } = useAuth();
  const { toast } = useToast();

  const fetchScheduledPosts = async () => {
    const { data, error } = await supabase
      .from('scheduled_blog_posts')
      .select('*')
      .order('scheduled_date', { ascending: true });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setScheduledPosts((data as ScheduledPost[]) || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchScheduledPosts();
  }, []);

  const handleCityChange = (citySlug: string) => {
    setFormData({ ...formData, targetCity: citySlug });
    if (citySlug) {
      const strategy = getCityBlogStrategy(citySlug);
      if (strategy) {
        setSuggestedTopics(strategy.blogTopics);
      }
    } else {
      setSuggestedTopics([]);
    }
  };

  const useSuggestedTopic = (topic: CityBlogTopic) => {
    setFormData({
      ...formData,
      topic: topic.title,
      keywords: topic.keywords.join(', '),
    });
  };

  const resetForm = () => {
    setFormData({
      topic: '',
      keywords: '',
      targetAudience: 'interior designers, architects, contractors',
      targetCity: '',
    });
    setSuggestedTopics([]);
  };

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      toast({ title: 'Error', description: 'Please select a date', variant: 'destructive' });
      return;
    }

    setSaving(true);

    const cityStrategy = formData.targetCity ? getCityBlogStrategy(formData.targetCity) : null;

    const { error } = await supabase
      .from('scheduled_blog_posts')
      .insert({
        topic: formData.topic,
        keywords: formData.keywords || null,
        target_audience: formData.targetAudience || null,
        target_city: formData.targetCity || null,
        target_country: cityStrategy?.countryCode || null,
        scheduled_date: format(selectedDate, 'yyyy-MM-dd'),
        created_by: user?.id,
      });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Scheduled', description: `Post scheduled for ${format(selectedDate, 'PPP')}` });
      setDialogOpen(false);
      resetForm();
      fetchScheduledPosts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scheduled post?')) return;

    const { error } = await supabase
      .from('scheduled_blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Scheduled post deleted.' });
      fetchScheduledPosts();
    }
  };

  const handleProcessNow = async () => {
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-scheduled-blogs');
      
      if (error) throw error;

      toast({ 
        title: 'Processing Complete', 
        description: `Processed ${data?.processed || 0} scheduled posts.` 
      });
      fetchScheduledPosts();
    } catch (error: any) {
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to process scheduled posts', 
        variant: 'destructive' 
      });
    } finally {
      setProcessing(false);
    }
  };

  const _getPostsForDate = (date: Date) => {
    return scheduledPosts.filter(post => 
      isSameDay(parseISO(post.scheduled_date), date)
    );
  };

  const getStatusBadge = (status: ScheduledPost['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-amber-600 border-amber-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'generating':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><Loader2 className="w-3 h-3 mr-1 animate-spin" />Generating</Badge>;
      case 'published':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Published</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return null;
    }
  };

  // Get days with scheduled posts for calendar highlighting
  const daysWithPosts = scheduledPosts.map(post => parseISO(post.scheduled_date));
  
  // Get pending count for stats
  const pendingCount = scheduledPosts.filter(p => p.status === 'pending').length;
  const publishedCount = scheduledPosts.filter(p => p.status === 'published').length;
  const failedCount = scheduledPosts.filter(p => p.status === 'failed').length;

  // Auto-schedule feature: generate posts for next 7 days
  const handleAutoSchedule = async () => {
    if (!formData.targetCity) {
      toast({ title: 'Error', description: 'Please select a target city first', variant: 'destructive' });
      return;
    }

    const cityStrategy = getCityBlogStrategy(formData.targetCity);
    if (!cityStrategy) return;

    setSaving(true);

    const postsToSchedule = cityStrategy.blogTopics.slice(0, 7).map((topic, index) => ({
      topic: topic.title,
      keywords: topic.keywords.join(', '),
      target_audience: 'interior designers, architects, contractors',
      target_city: formData.targetCity,
      target_country: cityStrategy.countryCode,
      scheduled_date: format(addDays(new Date(), index + 1), 'yyyy-MM-dd'),
      created_by: user?.id,
    }));

    const { error } = await supabase
      .from('scheduled_blog_posts')
      .insert(postsToSchedule);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Auto-Scheduled', description: `${postsToSchedule.length} posts scheduled for the next week` });
      setDialogOpen(false);
      resetForm();
      fetchScheduledPosts();
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Blog Scheduler</h2>
          <p className="text-muted-foreground">Automate AI blog generation with scheduled publishing</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={handleProcessNow}
            disabled={processing || pendingCount === 0}
          >
            {processing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            Process Now
          </Button>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Schedule AI Blog Post</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSchedule} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Publish Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-intorza-orange" />
                    Target City
                  </Label>
                  <Select value={formData.targetCity} onValueChange={handleCityChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {cityBlogStrategies.map((city) => (
                        <SelectItem key={city.citySlug} value={city.citySlug}>
                          {city.cityName}, {city.countryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {suggestedTopics.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Quick Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedTopics.slice(0, 3).map((topic, index) => (
                        <Button
                          key={index}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => useSuggestedTopic(topic)}
                          className="text-xs"
                        >
                          {topic.title.substring(0, 30)}...
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Topic / Title *</Label>
                  <Input
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    placeholder="e.g., Interior Design Trends 2025"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <Input
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                    placeholder="e.g., interior design, home decor"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={saving} className="flex-1">
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CalendarIcon className="w-4 h-4 mr-2" />}
                    Schedule Post
                  </Button>
                  {formData.targetCity && (
                    <Button 
                      type="button" 
                      variant="secondary"
                      onClick={handleAutoSchedule}
                      disabled={saving}
                      title="Auto-schedule all city topics for next 7 days"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Auto 7 Days
                    </Button>
                  )}
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-100">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{publishedCount}</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{failedCount}</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <CalendarIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{scheduledPosts.length}</p>
                <p className="text-sm text-muted-foreground">Total Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar and Posts List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Publishing Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md"
              modifiers={{
                hasPost: daysWithPosts,
              }}
              modifiersStyles={{
                hasPost: { 
                  backgroundColor: 'hsl(var(--primary) / 0.2)',
                  fontWeight: 'bold'
                }
              }}
            />
            <p className="text-xs text-muted-foreground mt-2">
              <span className="inline-block w-3 h-3 rounded bg-primary/20 mr-1"></span>
              Days with scheduled posts
            </p>
          </CardContent>
        </Card>

        {/* Scheduled Posts List */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Scheduled Posts</CardTitle>
            <Button variant="ghost" size="sm" onClick={fetchScheduledPosts}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {scheduledPosts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No scheduled posts yet</p>
                <p className="text-sm">Click "Schedule Post" to get started</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {scheduledPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusBadge(post.status)}
                        <span className="text-sm text-muted-foreground">
                          {format(parseISO(post.scheduled_date), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <h4 className="font-medium text-foreground truncate">{post.topic}</h4>
                      {post.target_city && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {post.target_city.replace('-', ' ')}
                        </p>
                      )}
                      {post.error_message && (
                        <p className="text-xs text-destructive mt-1">{post.error_message}</p>
                      )}
                    </div>
                    {post.status === 'pending' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-intorza-orange/10">
              <Sparkles className="w-6 h-6 text-intorza-orange" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Automatic Daily Publishing</h3>
              <p className="text-sm text-muted-foreground">
                Scheduled posts are automatically processed daily at midnight UTC. Each post is generated using AI with city-specific keywords and internal links for SEO. 
                You can also click "Process Now" to immediately generate and publish all pending posts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminScheduler;