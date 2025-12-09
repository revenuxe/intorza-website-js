import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "5 Tips for Creating Professional Quotations",
      excerpt: "Learn how to create quotations that impress clients and win more projects.",
      author: "Intorza Team",
      date: "Dec 5, 2024",
      readTime: "5 min read",
      category: "Tips & Tricks",
    },
    {
      title: "How to Manage Multiple Interior Projects",
      excerpt: "Juggling multiple projects? Here's how successful designers stay organized.",
      author: "Intorza Team",
      date: "Dec 1, 2024",
      readTime: "7 min read",
      category: "Productivity",
    },
    {
      title: "The Importance of Client Communication",
      excerpt: "Building lasting relationships with clients through effective communication.",
      author: "Intorza Team",
      date: "Nov 25, 2024",
      readTime: "4 min read",
      category: "Client Relations",
    },
    {
      title: "Invoice Best Practices for Interior Designers",
      excerpt: "Get paid faster with these professional invoicing strategies.",
      author: "Intorza Team",
      date: "Nov 20, 2024",
      readTime: "6 min read",
      category: "Finance",
    },
  ];

  return (
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
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {posts.map((post) => (
                <article
                  key={post.title}
                  className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />
                  <div className="p-6">
                    <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-4">
                      {post.category}
                    </span>
                    <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for the latest tips and industry insights.
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
  );
};

export default Blog;
