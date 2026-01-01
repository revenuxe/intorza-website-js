import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2, Eye, EyeOff, Sparkles, FileText, Check } from 'lucide-react';
import { format } from 'date-fns';

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

const AdminBlogs = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [activeTab, setActiveTab] = useState<'ai' | 'manual'>('ai');
  
  // AI Generation form
  const [aiForm, setAiForm] = useState({
    topic: '',
    keywords: '',
    targetAudience: '',
  });

  // Manual form
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    published: false,
  });

  const { user } = useAuth();
  const { toast } = useToast();

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
    });
    setEditingPost(null);
    setActiveTab('ai');
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
      const { data, error } = await supabase.functions.invoke('generate-blog', {
        body: {
          topic: aiForm.topic,
          keywords: aiForm.keywords,
          targetAudience: aiForm.targetAudience,
        },
      });

      if (error) throw error;

      // Switch to manual tab with generated content
      setFormData({
        title: aiForm.topic,
        slug: generateSlug(aiForm.topic),
        excerpt: data.excerpt || '',
        content: data.content || '',
        cover_image: '',
        published: false,
      });
      setActiveTab('manual');
      
      toast({ title: 'Success', description: 'Blog article generated! Review and edit before publishing.' });
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({ 
        title: 'Generation Failed', 
        description: error.message || 'Failed to generate blog. Please try again.',
        variant: 'destructive' 
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const postData = {
      title: formData.title,
      slug: formData.slug || generateSlug(formData.title),
      excerpt: formData.excerpt || null,
      content: formData.content,
      cover_image: formData.cover_image || null,
      published: formData.published,
      author_id: user?.id,
    };

    let error;
    if (editingPost) {
      const { error: updateError } = await supabase
        .from('blog_posts')
        .update(postData)
        .eq('id', editingPost.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert(postData);
      error = insertError;
    }

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: `Post ${editingPost ? 'updated' : 'created'} successfully!` });
      setDialogOpen(false);
      resetForm();
      fetchPosts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const { error } = await supabase.from('blog_posts').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Deleted', description: 'Post deleted successfully.' });
      fetchPosts();
    }
  };

  const togglePublish = async (post: BlogPost) => {
    const { error } = await supabase
      .from('blog_posts')
      .update({ 
        published: !post.published
      })
      .eq('id', post.id);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      fetchPosts();
    }
  };

  const aiFeatures = [
    '2500-3500 words of human-like content',
    'E-E-A-T compliant structure',
    'Proper H1, H2, H3 hierarchy',
    'Table of Contents',
    'Case studies with real examples',
    'Reference links to authoritative sources',
    'SEO-optimized meta tags',
    'Emotional hook and CTA',
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Blog Posts</h2>
          <p className="text-muted-foreground">Create and manage blog articles</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Article'}</DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'ai' | 'manual')} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ai" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  AI Generate
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Manual Edit
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ai" className="mt-4">
                <div className="border-2 border-dashed border-border rounded-lg p-6 space-y-6">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Sparkles className="w-5 h-5 text-intorza-orange" />
                    AI Blog Generator
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="ai-topic">Topic / Title *</Label>
                      <Input
                        id="ai-topic"
                        value={aiForm.topic}
                        onChange={(e) => setAiForm({ ...aiForm, topic: e.target.value })}
                        placeholder="e.g., Interior Design Trends for Modern Homes in 2024"
                      />
                      <p className="text-sm text-muted-foreground">What should the article be about?</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ai-keywords">Target Keywords</Label>
                      <Input
                        id="ai-keywords"
                        value={aiForm.keywords}
                        onChange={(e) => setAiForm({ ...aiForm, keywords: e.target.value })}
                        placeholder="e.g., interior design, home decor, modern living"
                      />
                      <p className="text-sm text-muted-foreground">Comma-separated keywords for SEO</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ai-audience">Target Audience</Label>
                      <Input
                        id="ai-audience"
                        value={aiForm.targetAudience}
                        onChange={(e) => setAiForm({ ...aiForm, targetAudience: e.target.value })}
                        placeholder="e.g., Interior designers, homeowners, contractors"
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                    <p className="font-medium text-foreground">AI will generate:</p>
                    <ul className="space-y-2">
                      {aiFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-intorza-green flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    onClick={handleGenerateWithAI} 
                    disabled={generating || !aiForm.topic.trim()}
                    className="w-full bg-muted hover:bg-muted/80 text-foreground"
                    size="lg"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Article...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Article with AI
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="manual" className="mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter post title"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">Slug (URL)</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="auto-generated-from-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Brief description for SEO..."
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your blog post content..."
                      rows={12}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cover_image">Cover Image URL</Label>
                    <Input
                      id="cover_image"
                      value={formData.cover_image}
                      onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      id="published"
                      checked={formData.published}
                      onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                    />
                    <Label htmlFor="published">Publish immediately</Label>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={saving}>
                      {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {editingPost ? 'Update Post' : 'Create Post'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : posts.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No blog posts yet. Create your first post!
            </div>
          ) : (
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
                {posts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-muted-foreground">/{post.slug}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => togglePublish(post)}
                        className={post.published ? 'text-intorza-green' : 'text-muted-foreground'}
                      >
                        {post.published ? (
                          <><Eye className="w-4 h-4 mr-1" /> Published</>
                        ) : (
                          <><EyeOff className="w-4 h-4 mr-1" /> Draft</>
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(post.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(post)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlogs;
