"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
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
import { Trash2, Loader2, RefreshCw, CheckCircle, XCircle, Clock, Sparkles, Lightbulb } from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';
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

export default function AdminScheduler() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    targetAudience: 'interior designers, architects, contractors',
    targetCity: '',
  });

  const [suggestedTopics, setSuggestedTopics] = useState<CityBlogTopic[]>([]);

  const { user } = useAuth();
  const { toast } = useToast();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Blog Scheduler</h2>
          <p className="text-muted-foreground">Automate your content pipeline with AI scheduling.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleProcessNow} disabled={processing}>
            {processing ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
            ) : (
              <><RefreshCw className="w-4 h-4 mr-2" /> Process Queue</>
            )}
          </Button>
          <Button onClick={() => setDialogOpen(true)}>
            <Sparkles className="w-4 h-4 mr-2" />
            Schedule AI Post
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Calendar Column */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border mx-auto"
            />
          </CardContent>
        </Card>

        {/* Scheduled Posts Column */}
        <Card className="lg:col-span-8">
          <CardHeader>
            <CardTitle>
              {selectedDate ? `Scheduled for ${format(selectedDate, 'PPP')}` : 'Upcoming Posts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : scheduledPosts.filter(p => !selectedDate || isSameDay(parseISO(p.scheduled_date), selectedDate)).length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-lg text-muted-foreground">
                  No posts scheduled for this date.
                </div>
              ) : (
                scheduledPosts
                  .filter(p => !selectedDate || isSameDay(parseISO(p.scheduled_date), selectedDate))
                  .map((post) => (
                    <div 
                      key={post.id} 
                      className="p-4 rounded-xl border border-border bg-card hover:shadow-md transition-shadow group"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <h4 className="font-semibold text-foreground line-clamp-1">{post.topic}</h4>
                          <div className="flex flex-wrap gap-2 items-center text-xs text-muted-foreground">
                            {getStatusBadge(post.status)}
                            {post.target_city && (
                              <span className="flex items-center gap-1">
                                <RefreshCw className="w-3 h-3" /> {post.target_city}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {format(parseISO(post.scheduled_date), 'PPP')}
                            </span>
                          </div>
                          {post.error_message && (
                            <p className="text-xs text-destructive mt-2 p-2 bg-destructive/5 rounded">
                              {post.error_message}
                            </p>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleDelete(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Schedule AI-Generated Blog Post
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSchedule} className="space-y-6 pt-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Target City Strategy</Label>
                  <Select value={formData.targetCity} onValueChange={handleCityChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cityBlogStrategies.map(s => (
                        <SelectItem key={s.citySlug} value={s.citySlug}>
                          {s.cityName}, {s.countryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Blog Topic / Main Keyword</Label>
                  <Input 
                    id="topic"
                    placeholder="e.g. Best Interior Design Software in New York"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Target Keywords</Label>
                  <Input 
                    id="keywords"
                    placeholder="e.g. interior design, NYC, software"
                    value={formData.keywords}
                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  AI Suggested Topics
                </Label>
                <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2">
                  {suggestedTopics.length > 0 ? (
                    suggestedTopics.map((topic, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => useSuggestedTopic(topic)}
                        className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-xs group"
                      >
                        <div className="font-semibold mb-1 group-hover:text-primary">{topic.title}</div>
                        <div className="text-muted-foreground line-clamp-1">
                          Keywords: {topic.keywords.join(', ')}
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-xs text-muted-foreground p-8 text-center border border-dashed rounded-lg">
                      Select a city to see suggestions.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Scheduling...</>
                ) : (
                  <><Sparkles className="w-4 h-4 mr-2" /> Schedule for {selectedDate ? format(selectedDate, 'MMM d') : 'selected date'}</>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
