"use client";

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, Sparkles, FileText, Check, MapPin, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';
import { cityBlogStrategies, getCityBlogStrategy, type CityBlogTopic } from '@/data/cityBlogStrategy';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  published: boolean | null;
  created_at: string;
  updated_at: string;
}

export default function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>('ai');
  
  const [aiForm, setAiForm] = useState({
    topic: '',
    keywords: '',
    targetAudience: '',
    targetCity: '',
  });
  
  const [suggestedTopics, setSuggestedTopics] = useState<CityBlogTopic[]>([]);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    published: false,
  });

  const { toast } = useToast();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image: '',
      published: false,
    });
    setAiForm({
      topic: '',
      keywords: '',
      targetAudience: '',
      targetCity: '',
    });
    setSuggestedTopics([]);
    setEditingPost(null);
    setActiveTab('ai');
  };
  
  const handleCityChange = (citySlug: string) => {
    setAiForm({ ...aiForm, targetCity: citySlug });
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
    setAiForm({
      ...aiForm,
      topic: topic.title,
      keywords: topic.keywords.join(', '),
    });
  };

  const openEditDialog = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      cover_image: post.cover_image || '',
      published: post.published || false,
    });
    setActiveTab('manual');
    setDialogOpen(true);
  };

  const handleGenerateWithAI = async () => {
    if (!aiForm.topic.trim()) {
      toast({ title: 'Error', description: 'Please enter a topic/title', variant: 'destructive' });
      return;
    }

    setGenerating(true);
    try {
      const cityStrategy = aiForm.targetCity ? getCityBlogStrategy(aiForm.targetCity) : null;
      
      const { data, error } = await supabase.functions.invoke('generate-blog', {
        body: {
          topic: aiForm.topic,
          keywords: aiForm.keywords,
          targetAudience: aiForm.targetAudience,
          targetCity: cityStrategy?.cityName || '',
          targetCountry: cityStrategy?.countryCode || '',
          localTerms: cityStrategy?.localTerms?.join(', ') || '',
          internalLinks: cityStrategy ? cityStrategy.blogTopics.map(t => 
            `- [${t.title.split(':')[0]}](${t.targetUrl})`
          ).join('\n') : '',
        },
      });

      if (error) throw error;

      setFormData({
        title: aiForm.topic,
        slug: generateSlug(aiForm.topic),
        excerpt: data.excerpt || '',
        content: data.content || '',
        cover_image: '',
        published: false,
      });
      setActiveTab('manual');
      
      toast({ title: 'Success', description: 'Blog content generated successfully!' });
    } catch (error: any) {
      toast({ title: 'AI Generation Failed', description: error.message, variant: 'destructive' });
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const postData = {
      ...formData,
      updated_at: new Date().toISOString(),
    };

    try {
      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Blog post updated successfully' });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([{ ...postData, created_at: new Date().toISOString() }]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Blog post created successfully' });
      }
      setDialogOpen(false);
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Blog post deleted successfully' });
      fetchPosts();
    }
  };

  const togglePublished = async (post: BlogPost) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: !post.published })
      .eq('id', post.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      fetchPosts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Blog Posts</h2>
          <p className="text-muted-foreground">Manage your blog content and SEO strategy.</p>
        </div>
        <Button onClick={() => { resetForm(); setDialogOpen(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : posts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No posts found.
                  </TableCell>
                </TableRow>
              ) : (
                posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <button 
                        onClick={() => togglePublished(post)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                          post.published 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                      >
                        {post.published ? (
                          <><Eye className="w-3 h-3" /> Published</>
                        ) : (
                          <><EyeOff className="w-3 h-3" /> Draft</>
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {format(new Date(post.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(post)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ai" disabled={!!editingPost}>
                <Sparkles className="w-4 h-4 mr-2" />
                AI Generator
              </TabsTrigger>
              <TabsTrigger value="manual">
                <FileText className="w-4 h-4 mr-2" />
                Manual Editor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai" className="space-y-6 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Target City Strategy</Label>
                    <Select value={aiForm.targetCity} onValueChange={handleCityChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a city for local SEO..." />
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
                    <Label htmlFor="ai-topic">Blog Topic / Main Keyword</Label>
                    <Input 
                      id="ai-topic"
                      placeholder="e.g. Best Interior Design Software in New York"
                      value={aiForm.topic}
                      onChange={(e) => setAiForm({ ...aiForm, topic: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ai-keywords">Keywords (comma separated)</Label>
                    <Input 
                      id="ai-keywords"
                      placeholder="e.g. interior design, NYC, software, quotation"
                      value={aiForm.keywords}
                      onChange={(e) => setAiForm({ ...aiForm, keywords: e.target.value })}
                    />
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={handleGenerateWithAI}
                    disabled={generating}
                  >
                    {generating ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating Content...</>
                    ) : (
                      <><Sparkles className="w-4 h-4 mr-2" /> Generate with AI</>
                    )}
                  </Button>
                </div>

                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" />
                    Suggested SEO Topics for {aiForm.targetCity || 'Selected City'}
                  </Label>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {suggestedTopics.length > 0 ? (
                      suggestedTopics.map((topic, i) => (
                        <button
                          key={i}
                          onClick={() => useSuggestedTopic(topic)}
                          className="w-full text-left p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-sm group"
                        >
                          <div className="font-semibold mb-1 group-hover:text-primary">{topic.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            Keywords: {topic.keywords.join(', ')}
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground p-8 text-center border border-dashed rounded-lg">
                        Select a city to see AI-powered SEO topic suggestions.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          title: e.target.value,
                          slug: editingPost ? formData.slug : generateSlug(e.target.value)
                        })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="slug">Slug</Label>
                      <Input
                        id="slug"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cover_image">Cover Image URL</Label>
                      <Input
                        id="cover_image"
                        value={formData.cover_image}
                        onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="space-y-0.5">
                        <Label>Published Status</Label>
                        <p className="text-xs text-muted-foreground">Make this post visible to the public</p>
                      </div>
                      <Switch
                        checked={formData.published}
                        onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="excerpt">Excerpt (SEO Description)</Label>
                      <Textarea
                        id="excerpt"
                        className="h-[120px] resize-none"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content (HTML or Markdown)</Label>
                  <Textarea
                    id="content"
                    className="min-h-[400px] font-mono text-sm"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                    ) : (
                      editingPost ? 'Update Post' : 'Create Post'
                    )}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
