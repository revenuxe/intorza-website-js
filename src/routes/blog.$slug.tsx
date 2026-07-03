import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getPostBySlug } from "@/lib/blog.functions";
import { formatBlogContent, formatDate, estimateReadTime } from "@/lib/blog-format";
import Breadcrumbs, { breadcrumbListSchema } from "@/components/seo/Breadcrumbs";
import { SITE_URL, SITE_OG_IMAGE } from "@/lib/site";
import { socialImageMeta } from "@/lib/seo";

const postQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog", "post", slug],
    queryFn: () => getPostBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const data = await context.queryClient.ensureQueryData(postQuery(params.slug));
    if (!data.post) throw notFound();
    return data;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData?.post) return {};
    const post = loaderData.post;
    const url = `${SITE_URL}/blog/${params.slug}`;
    const description = post.excerpt || post.content.substring(0, 160);
    const rawImage = post.cover_image || SITE_OG_IMAGE;
    const image = rawImage.startsWith("http") ? rawImage : `${SITE_URL}${rawImage}`;
    return {
      meta: [
        { title: `${post.title} | Intorza Blog` },
        { name: "description", content: description },
        { property: "og:title", content: post.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.created_at },
        { property: "article:modified_time", content: post.updated_at },
        { property: "article:author", content: "Intorza" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: description },
        ...socialImageMeta(image, post.title),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description,
            datePublished: post.created_at,
            dateModified: post.updated_at,
            image: [image],
            author: { "@type": "Organization", name: "Intorza", url: SITE_URL },
            publisher: { "@type": "Organization", name: "Intorza", logo: { "@type": "ImageObject", url: `${SITE_URL}/intorza-logo.webp` } },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbListSchema([
              { name: "Blog", url: `${SITE_URL}/blog` },
              { name: post.title, url },
            ]),
          ),
        },
      ],
    };
  },
  component: BlogDetail,
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => { router.invalidate(); reset(); }} className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Try again</button>
      </div>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 section-padding">
        <div className="container-custom text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Post Not Found</h1>
          <Button asChild>
            <Link to="/blog"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  ),
});

function BlogDetail() {
  const { post, related } = Route.useLoaderData();
  if (!post) return null;
  const html = formatBlogContent(post.content);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom max-w-4xl">
            <Breadcrumbs
              items={[
                { name: "Blog", url: `${SITE_URL}/blog` },
                { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
              ]}
              className="mb-6"
            />
            <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2"><Calendar className="w-5 h-5" />{formatDate(post.created_at)}</span>
              <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{estimateReadTime(post.content)}</span>
            </div>
          </div>
        </section>

        {post.cover_image && (
          <section className="container-custom -mt-8 relative z-10 max-w-4xl">
            <img src={post.cover_image} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-2xl" />
          </section>
        )}

        <section className="py-12 md:py-16">
          <div className="container-custom max-w-4xl">
            <article className="blog-content" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>

        {related.length > 0 && (
          <section className="section-padding bg-muted/30">
            <div className="container-custom max-w-5xl">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {related.map((r: typeof post) => (
                  <article key={r.id} className="bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
                    <Link to="/blog/$slug" params={{ slug: r.slug }}>
                      {r.cover_image ? (
                        <img src={r.cover_image} alt={r.title} className="w-full h-40 object-cover" />
                      ) : (
                        <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20" />
                      )}
                      <div className="p-5">
                        <h3 className="font-display font-semibold text-foreground mb-2 line-clamp-2">{r.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {r.excerpt || r.content.substring(0, 100)}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
