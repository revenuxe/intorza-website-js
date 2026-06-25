import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { listPublishedPosts } from "@/lib/blog.functions";
import { formatDate, estimateReadTime } from "@/lib/blog-format";
import { SITE_URL } from "@/lib/site";
import { socialImageMeta } from "@/lib/seo";

const postsQuery = queryOptions({
  queryKey: ["blog", "posts"],
  queryFn: () => listPublishedPosts(),
});

const TITLE = "Blog | Intorza — Interior Design Business Insights";
const DESCRIPTION = "Expert tips, strategies, and industry insights for interior designers and contractors. Grow your business with Intorza.";

export const Route = createFileRoute("/blog/")({
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(postsQuery);
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      ...socialImageMeta(),
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Intorza Blog",
          url: `${SITE_URL}/blog`,
          publisher: { "@type": "Organization", name: "Intorza", logo: { "@type": "ImageObject", url: `${SITE_URL}/intorza-logo.webp` } },
        }),
      },
    ],
  }),
  component: BlogIndex,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => { router.invalidate(); reset(); }} className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Try again</button>
      </div>
    );
  },
});

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQuery);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom max-w-4xl text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">Blog</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Insights for <span className="text-gradient">Interior Professionals</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Tips, strategies, and industry insights to help you grow your interior design and contracting business.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {posts.map((post) => (
                  <article key={post.id} className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.cover_image ? (
                        <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />
                      )}
                    </Link>
                    <div className="p-6">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        <h2 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h2>
                      </Link>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt || post.content.substring(0, 150) + "..."}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(post.created_at)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{estimateReadTime(post.content)}</span>
                      </div>
                      <Link to="/blog/$slug" params={{ slug: post.slug }} className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:gap-3 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
