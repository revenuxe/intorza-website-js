import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ArticleSchema } from "@/components/seo/SchemaMarkup";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  created_at: string;
  updated_at: string;
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();

      if (!error && data) {
        setPost(data);
        
        // Fetch related posts
        const { data: related } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("published", true)
          .neq("slug", slug)
          .limit(3);
        
        if (related) {
          setRelatedPosts(related);
        }
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || "")}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 section-padding">
          <div className="container-custom text-center">
            <h1 className="font-display text-3xl font-bold text-foreground mb-4">
              Post Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Intorza Blog</title>
        <meta name="description" content={post.excerpt || post.content.substring(0, 160)} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.content.substring(0, 160)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={shareUrl} />
        {post.cover_image && <meta property="og:image" content={post.cover_image} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.content.substring(0, 160)} />
        <link rel="canonical" href={`https://intorza.com/blog/${post.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt || post.content.substring(0, 160),
            datePublished: post.created_at,
            dateModified: post.updated_at,
            author: {
              "@type": "Organization",
              name: "Intorza",
            },
            publisher: {
              "@type": "Organization",
              name: "Intorza",
              logo: {
                "@type": "ImageObject",
                url: "https://intorza.com/intorza-logo.webp",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://intorza.com/blog/${post.slug}`,
            },
            image: post.cover_image,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          {/* Hero Section */}
          <section className="section-padding bg-gradient-hero">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <Breadcrumbs 
                  items={[
                    { name: "Blog", url: "https://intorza.com/blog" },
                    { name: post.title, url: `https://intorza.com/blog/${post.slug}` }
                  ]} 
                  className="mb-6"
                />
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>

                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {formatDate(post.created_at)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {estimateReadTime(post.content)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Cover Image */}
          {post.cover_image && (
            <section className="container-custom -mt-8 relative z-10">
              <div className="max-w-4xl mx-auto">
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </section>
          )}

          {/* Content */}
          <section className="py-12 md:py-16 lg:py-20">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
                  {/* Main Content */}
                  <article className="blog-article">
                    <div
                      className="blog-content"
                      dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
                    />
                    
                    {/* Author Card */}
                    <div className="mt-12 pt-8 border-t border-border">
                      <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-2xl">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary">I</span>
                        </div>
                        <div>
                          <p className="font-display font-semibold text-foreground">Intorza Team</p>
                          <p className="text-sm text-muted-foreground">Expert insights for interior design professionals</p>
                        </div>
                      </div>
                    </div>
                  </article>

                  {/* Sidebar */}
                  <aside className="space-y-6">
                    {/* Share Card */}
                    <div className="bg-card rounded-2xl p-6 border border-border sticky top-28 shadow-sm">
                      <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Share2 className="w-5 h-5 text-primary" />
                        Share Article
                      </h3>
                      <div className="flex gap-3">
                        <a
                          href={shareLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-80 hover:scale-110 transition-all"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                        <a
                          href={shareLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-80 hover:scale-110 transition-all"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a
                          href={shareLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:opacity-80 hover:scale-110 transition-all"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="mt-6 pt-6 border-t border-border space-y-3">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{estimateReadTime(post.content)}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="section-padding bg-gradient-cta">
            <div className="container-custom text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Ready to Transform Your Interior Business?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Join thousands of interior professionals using Intorza to streamline their quotations, invoices, and client management.
              </p>
              <Button variant="secondary" size="lg" asChild>
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  Get Started Free
                </a>
              </Button>
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="section-padding">
              <div className="container-custom">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {relatedPosts.map((relatedPost) => (
                    <article
                      key={relatedPost.id}
                      className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 group"
                    >
                      <Link to={`/blog/${relatedPost.slug}`}>
                        {relatedPost.cover_image ? (
                          <img
                            src={relatedPost.cover_image}
                            alt={relatedPost.title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20" />
                        )}
                      </Link>
                      <div className="p-5">
                        <Link to={`/blog/${relatedPost.slug}`}>
                          <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {relatedPost.excerpt || relatedPost.content.substring(0, 100)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
};

// Helper function to clean and format content with proper HTML
const formatContent = (content: string): string => {
  // Remove META_ prefixes that AI might include in the content
  let cleanedContent = content
    .replace(/^META_TITLE:\s*.+$/gm, '')
    .replace(/^META_DESCRIPTION:\s*.+$/gm, '')
    .replace(/^EXCERPT:\s*.+$/gm, '')
    .replace(/^TITLE:\s*.+$/gm, '')
    .replace(/^DESCRIPTION:\s*.+$/gm, '')
    .trim();

  // If content is already HTML with proper tags, return as-is
  if (cleanedContent.includes("<article") || (cleanedContent.includes("<h1") && cleanedContent.includes("<p>"))) {
    return cleanedContent;
  }

  // Convert markdown-like content to beautiful HTML
  let html = cleanedContent
    // Code blocks (before other transformations)
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="code-block"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    // Headers with proper IDs for TOC linking
    .replace(/^### (.+)$/gm, (_, text) => `<h3 id="${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${text}</h3>`)
    .replace(/^## (.+)$/gm, (_, text) => `<h2 id="${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${text}</h2>`)
    .replace(/^# (.+)$/gm, (_, text) => `<h1 id="${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${text}</h1>`)
    // Bold
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="section-divider" />')
    // Unordered lists
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Ordered lists
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>");

  // Process paragraphs - split by double newlines
  const blocks = html.split(/\n\n+/);
  html = blocks.map((block) => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    
    // Skip if already wrapped in HTML tags
    if (
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<li") ||
      trimmed.startsWith("<ul") ||
      trimmed.startsWith("<ol") ||
      trimmed.startsWith("<blockquote") ||
      trimmed.startsWith("<pre") ||
      trimmed.startsWith("<hr")
    ) {
      return trimmed;
    }
    
    // Handle single line breaks within paragraphs
    const withBreaks = trimmed.replace(/\n/g, '<br />');
    return `<p>${withBreaks}</p>`;
  }).filter(Boolean).join("\n\n");

  // Wrap consecutive list items in ul/ol
  html = html.replace(/(<li>.*?<\/li>\s*)+/gs, (match) => {
    return `<ul class="content-list">${match}</ul>`;
  });

  // Wrap consecutive blockquotes
  html = html.replace(/(<blockquote>.*?<\/blockquote>\s*)+/gs, (match) => {
    return `<div class="quote-block">${match}</div>`;
  });

  return html;
};

export default BlogDetail;
