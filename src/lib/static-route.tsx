import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

type StaticPage = {
  path: "/about" | "/careers" | "/privacy" | "/terms" | "/cookies" | "/refund";
  title: string;
  description: string;
  heading: string;
  body: React.ReactNode;
};

export function makeStaticRoute(page: StaticPage) {
  return createFileRoute(page.path)({
    head: () => ({
      meta: [
        { title: page.title },
        { name: "description", content: page.description },
        { property: "og:title", content: page.title },
        { property: "og:description", content: page.description },
        { property: "og:url", content: `${SITE_URL}${page.path}` },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}${page.path}` }],
    }),
    component: () => (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container-custom max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
              {page.heading}
            </h1>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              {page.body}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    ),
  });
}
