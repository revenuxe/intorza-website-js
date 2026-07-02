import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { z } from "zod";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { listPublishedPosts, type BlogPost } from "@/lib/blog.functions";
import { formatDate, estimateReadTime } from "@/lib/blog-format";
import { SITE_URL } from "@/lib/site";
import { socialImageMeta } from "@/lib/seo";
import { cn } from "@/lib/utils";

const postsQuery = queryOptions({
  queryKey: ["blog", "posts"],
  queryFn: () => listPublishedPosts(),
});

const TITLE = "Blog | Intorza — Interior Design Business Insights";
const DESCRIPTION =
  "Expert playbooks on interior design quotation software, GST invoicing in India, and project management. Cluster-organised so you can go deep on the topic that matters.";

const searchSchema = z.object({
  topic: z.string().optional(),
});

export const Route = createFileRoute("/blog/")({
  validateSearch: searchSchema,
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
          publisher: {
            "@type": "Organization",
            name: "Intorza",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/intorza-logo.webp` },
          },
        }),
      },
    ],
  }),
  component: BlogIndex,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          Try again
        </button>
      </div>
    );
  },
});

type Cluster = {
  category: string;
  pillar?: BlogPost;
  posts: BlogPost[];
};

function buildClusters(posts: BlogPost[]): Cluster[] {
  const byCategory = new Map<string, BlogPost[]>();
  for (const p of posts) {
    const c = p.category ?? "Other";
    if (!byCategory.has(c)) byCategory.set(c, []);
    byCategory.get(c)!.push(p);
  }
  // Preferred order for known pillars.
  const order = [
    "Quotation Software",
    "GST & Compliance",
    "Project Management",
  ];
  const keys = [
    ...order.filter((k) => byCategory.has(k)),
    ...Array.from(byCategory.keys()).filter((k) => !order.includes(k)),
  ];
  return keys.map((category) => {
    const list = byCategory.get(category)!;
    const pillar = list.find((p) => !p.pillar_slug);
    const rest = list.filter((p) => p.slug !== pillar?.slug);
    return { category, pillar, posts: rest };
  });
}

function BlogIndex() {
  const { data: posts } = useSuspenseQuery(postsQuery);
  const { topic } = Route.useSearch();
  const navigate = Route.useNavigate();

  const clusters = useMemo(() => buildClusters(posts), [posts]);
  const topics = useMemo(
    () => ["All", ...clusters.map((c) => c.category)],
    [clusters],
  );
  const active = topic && topics.includes(topic) ? topic : "All";
  const visibleClusters =
    active === "All" ? clusters : clusters.filter((c) => c.category === active);

  const setTopic = (t: string) =>
    navigate({
      search: (prev) => ({ ...prev, topic: t === "All" ? undefined : t }),
      replace: true,
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom max-w-4xl text-center">
            <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
              Blog
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Insights for <span className="text-gradient">Interior Professionals</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Deep, cluster-organised playbooks on quotations, GST invoicing and
              project management — written for interior designers and contractors.
            </p>
          </div>
        </section>

        {/* Topic filter */}
        {posts.length > 0 && (
          <section className="border-b border-border sticky top-16 md:top-20 z-30 bg-background/85 backdrop-blur">
            <div className="container-custom">
              <div
                role="tablist"
                aria-label="Blog topics"
                className="flex gap-2 overflow-x-auto py-4 no-scrollbar"
              >
                {topics.map((t) => {
                  const selected = t === active;
                  return (
                    <button
                      key={t}
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setTopic(t)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all border",
                        selected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-card text-foreground border-border hover:border-primary/40 hover:text-primary",
                      )}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className="section-padding">
          <div className="container-custom">
            {posts.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No blog posts yet. Check back soon!
              </p>
            ) : (
              <div className="space-y-16 md:space-y-24">
                {visibleClusters.map((cluster) => (
                  <ClusterSection key={cluster.category} cluster={cluster} />
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

function ClusterSection({ cluster }: { cluster: Cluster }) {
  return (
    <section aria-labelledby={`cluster-${cluster.category}`}>
      <header className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Topic Cluster
          </span>
          <h2
            id={`cluster-${cluster.category}`}
            className="font-display text-2xl md:text-3xl font-bold text-foreground"
          >
            {cluster.category}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          {cluster.posts.length + (cluster.pillar ? 1 : 0)} articles — start with the
          pillar guide, then go deep with the clusters.
        </p>
      </header>

      {cluster.pillar && <PillarCard post={cluster.pillar} />}

      {cluster.posts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {cluster.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

function PillarCard({ post }: { post: BlogPost }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-card p-6 md:p-10 shadow-md hover:shadow-xl transition-all">
      <div className="grid md:grid-cols-5 gap-8 items-center">
        <div className="md:col-span-3">
          <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full mb-4">
            Pillar Guide
          </span>
          <Link to="/blog/$slug" params={{ slug: post.slug }}>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground mb-5 line-clamp-3">
            {post.excerpt || post.content.substring(0, 180) + "…"}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.created_at)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {estimateReadTime(post.content)}
            </span>
          </div>
          <Link
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Read the full guide <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        {post.cover_image && (
          <div className="md:col-span-2 order-first md:order-last">
            <Link to="/blog/$slug" params={{ slug: post.slug }}>
              <img
                src={post.cover_image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                className="w-full h-48 md:h-56 object-cover rounded-2xl"
              />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group flex flex-col">
      <Link to="/blog/$slug" params={{ slug: post.slug }}>
        {post.cover_image ? (
          <img
            src={post.cover_image}
            alt={post.title}
            loading="lazy"
            decoding="async"
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20" />
        )}
      </Link>
      <div className="p-6 flex flex-col flex-1">
        {post.category && (
          <span className="text-[11px] uppercase tracking-wider font-semibold text-primary mb-2">
            {post.category}
          </span>
        )}
        <Link to="/blog/$slug" params={{ slug: post.slug }}>
          <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt || post.content.substring(0, 150) + "…"}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.created_at)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {estimateReadTime(post.content)}
          </span>
        </div>
        <Link
          to="/blog/$slug"
          params={{ slug: post.slug }}
          className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:gap-3 transition-all text-sm"
        >
          Read more <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
