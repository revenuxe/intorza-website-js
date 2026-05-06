"use client";

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, MessageSquare } from 'lucide-react';

interface Stats {
  blogPosts: number;
  publishedPosts: number;
  jobListings: number;
  publishedJobs: number;
  inquiries: number;
  unreadInquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    blogPosts: 0,
    publishedPosts: 0,
    jobListings: 0,
    publishedJobs: 0,
    inquiries: 0,
    unreadInquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchStats = async () => {
      const [blogRes, jobRes, inquiryRes] = await Promise.all([
        supabase.from('blog_posts').select('id, published'),
        supabase.from('job_listings').select('id, published'),
        supabase.from('inquiries').select('id, read'),
      ]);

      setStats({
        blogPosts: blogRes.data?.length || 0,
        publishedPosts: blogRes.data?.filter(p => p.published).length || 0,
        jobListings: jobRes.data?.length || 0,
        publishedJobs: jobRes.data?.filter(j => j.published).length || 0,
        inquiries: inquiryRes.data?.length || 0,
        unreadInquiries: inquiryRes.data?.filter(i => !i.read).length || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Blog Posts',
      value: stats.blogPosts,
      subValue: `${stats.publishedPosts} published`,
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Job Listings',
      value: stats.jobListings,
      subValue: `${stats.publishedJobs} published`,
      icon: Briefcase,
      color: 'bg-intorza-green/20 text-intorza-green',
    },
    {
      title: 'Inquiries',
      value: stats.inquiries,
      subValue: `${stats.unreadInquiries} unread`,
      icon: MessageSquare,
      color: 'bg-primary/10 text-primary',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Welcome to Admin Panel</h2>
        <p className="text-muted-foreground">Manage your website content from here.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <Card key={card.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {loading ? '...' : card.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{card.subValue}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a 
              href="/admin/blogs" 
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors flex items-center gap-3"
            >
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium">Create Blog Post</span>
            </a>
            <a 
              href="/admin/careers" 
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors flex items-center gap-3"
            >
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="font-medium">Add Job Listing</span>
            </a>
            <a 
              href="/admin/inquiries" 
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors flex items-center gap-3"
            >
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="font-medium">View Inquiries</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
