import { createClient, createStaticClient } from "@/lib/supabase";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, ChevronRight } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createStaticClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!post) return {};

  return {
    title: `${post.title} | Intorza Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    alternates: {
      canonical: `https://intorza.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: "article",
      url: `https://intorza.com/blog/${post.slug}`,
      images: post.cover_image ? [post.cover_image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = createStaticClient();
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .neq("slug", params.slug)
    .limit(3);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const shareUrl = `https://intorza.com/blog/${post.slug}`;

  // Simple ToC generator
  const headings = post.content.match(/^#{2,3}\s+(.+)$/gm) || [];
  const toc = headings.map((heading: string) => {
    const level = heading.startsWith('###') ? 3 : 2;
    const text = heading.replace(/^#{2,3}\s+/, '');
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    return { level, text, id };
  });

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    image: post.cover_image,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      "@type": "Organization",
      name: "Intorza",
      url: "https://intorza.com"
    },
    publisher: {
      "@type": "Organization",
      name: "Intorza",
      logo: {
        "@type": "ImageObject",
        url: "https://intorza.com/assets/intorza-logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": shareUrl,
    },
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-background">
        <main className="pt-24">
          <section className="relative py-12 md:py-20 bg-gradient-hero overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto">
                <Breadcrumbs 
                  items={[
                    { name: "Blog", url: "https://intorza.com/blog" },
                    { name: post.title, url: shareUrl }
                  ]} 
                  className="mb-8"
                />
                
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all mb-8 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Blog
                </Link>

                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 leading-tight tracking-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-y border-border/50 py-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold">Published</p>
                      <p className="text-sm font-medium text-foreground">{formatDate(post.created_at)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-semibold">Reading Time</p>
                      <p className="text-sm font-medium text-foreground">{estimateReadTime(post.content)}</p>
                    </div>
                  </div>

                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider font-semibold mr-2">Share:</span>
                    <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-muted hover:bg-primary hover:text-white flex items-center justify-center transition-all">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="pb-24">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto -mt-12 md:-mt-16">
                {post.cover_image && (
                  <div className="mb-16 rounded-[2rem] overflow-hidden shadow-2xl relative aspect-video border-4 border-background">
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                <div className="grid lg:grid-cols-12 gap-12 items-start">
                  {/* Article Content */}
                  <div className="lg:col-span-8">
                    <article className="prose prose-lg prose-primary max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 transition-colors prose-img:rounded-2xl prose-img:shadow-lg">
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h2: ({node, ...props}) => {
                            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                            return <h2 id={id} {...props} />
                          },
                          h3: ({node, ...props}) => {
                            const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                            return <h3 id={id} {...props} />
                          }
                        }}
                      >
                        {post.content}
                      </ReactMarkdown>
                    </article>
                    
                    {/* Share Section Bottom */}
                    <div className="mt-20 p-8 rounded-3xl bg-muted/30 border border-border/50 text-center">
                      <h3 className="font-display text-2xl font-bold mb-4">Did you find this helpful?</h3>
                      <p className="text-muted-foreground mb-8">Share this article with your network and help others grow too!</p>
                      <div className="flex flex-wrap justify-center gap-4">
                        <Button asChild variant="default" className="rounded-full px-8">
                          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-4 h-4 mr-2" />
                            Share on LinkedIn
                          </a>
                        </Button>
                        <Button asChild variant="outline" className="rounded-full px-8">
                          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                            <Twitter className="w-4 h-4 mr-2" />
                            Tweet This
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
                    {/* Table of Contents */}
                    {toc.length > 0 && (
                      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                        <h3 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                          <ChevronRight className="w-4 h-4 text-primary" />
                          Table of Contents
                        </h3>
                        <nav className="space-y-1">
                          {toc.map((item) => (
                            <a
                              key={item.id}
                              href={`#${item.id}`}
                              className={`block py-2 text-sm transition-colors hover:text-primary ${
                                item.level === 3 ? 'pl-4 text-muted-foreground' : 'font-medium text-foreground'
                              }`}
                            >
                              {item.text}
                            </a>
                          ))}
                        </nav>
                      </div>
                    )}

                    {relatedPosts && relatedPosts.length > 0 && (
                      <div className="space-y-6">
                        <h3 className="font-display text-xl font-bold border-l-4 border-primary pl-4">
                          Related Articles
                        </h3>
                        <div className="space-y-8">
                          {relatedPosts.map((related) => (
                            <Link
                              key={related.id}
                              href={`/blog/${related.slug}`}
                              className="group block space-y-3"
                            >
                              {related.cover_image && (
                                <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                                  <Image src={related.cover_image} alt={related.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                              )}
                              <div className="font-display font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                {related.title}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Calendar className="w-3 h-3" />
                                {formatDate(related.created_at)}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-glow relative overflow-hidden group">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                      <h3 className="font-display text-2xl font-bold mb-4 relative z-10">
                        Modernize Your Interior Business
                      </h3>
                      <p className="text-primary-foreground/80 mb-8 relative z-10 leading-relaxed">
                        Join 500+ professionals using Intorza to automate their quotations and project management.
                      </p>
                      <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold rounded-xl relative z-10 py-6" asChild>
                        <a href="https://app.intorza.com">Get Started Free</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("published", true);

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}
