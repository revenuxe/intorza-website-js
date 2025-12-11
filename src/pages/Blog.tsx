import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  created_at: string;
  content: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <>
      <Helmet>
        <title>Blog | Intorza - Interior Design Business Insights & Tips</title>
        <meta
          name="description"
          content="Expert tips, strategies, and industry insights for interior designers and contractors. Learn how to grow your business with Intorza."
        />
        <meta
          name="keywords"
          content="interior design blog, contractor tips, quotation software, invoice management, business growth"
        />
        <link rel="canonical" href="https://intorza.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Intorza Blog",
            description:
              "Tips, strategies, and industry insights for interior design professionals",
            url: "https://intorza.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Intorza",
              logo: {
                "@type": "ImageObject",
                url: "https://intorza.com/intorza-logo.png",
              },
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24">
          {/* Hero Section */}
          <section className="section-padding bg-gradient-hero">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  Blog
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Insights for{" "}
                  <span className="text-gradient">Interior Professionals</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Tips, strategies, and industry insights to help you grow your
                  interior design and contracting business.
                </p>
              </div>
            </div>
          </section>

          {/* Blog Posts */}
          <section className="section-padding">
            <div className="container-custom">
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    No blog posts yet. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {posts.map((post) => (
                    <article
                      key={post.id}
                      className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
                    >
                      <Link to={`/blog/${post.slug}`}>
                        {post.cover_image ? (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />
                        )}
                      </Link>
                      <div className="p-6">
                        <Link to={`/blog/${post.slug}`}>
                          <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {post.title}
                          </h2>
                        </Link>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                          {post.excerpt || post.content.substring(0, 150) + "..."}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.published_at || post.created_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {estimateReadTime(post.content)}
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:gap-3 transition-all"
                        >
                          Read More <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Newsletter */}
          <section className="section-padding bg-primary">
            <div className="container-custom text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Stay Updated
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
                Subscribe to our newsletter for the latest tips and industry
                insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-foreground/50"
                />
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog;
