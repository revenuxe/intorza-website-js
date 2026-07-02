import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Heart, Zap, Sparkles, ExternalLink } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { socialImageMeta } from "@/lib/seo";

const TITLE = "About Intorza — Our Mission to Empower Interior Designers";
const DESCRIPTION = "Learn about Intorza's mission to simplify business operations for interior designers and contractors. Discover our story, values, and commitment to the industry.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      ...socialImageMeta(),
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/about` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: TITLE,
          url: `${SITE_URL}/about`,
          description: DESCRIPTION,
        }),
      },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    { icon: Target, title: "Mission-Driven", description: "We're on a mission to simplify business operations for interior professionals worldwide." },
    { icon: Heart, title: "Customer First", description: "Every feature we build is designed with our users' needs at the center." },
    { icon: Zap, title: "Innovation", description: "We continuously push boundaries to deliver cutting-edge solutions." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom max-w-4xl text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Empowering Interior Professionals to <span className="text-gradient">Grow Their Business</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Intorza was founded with a simple goal: to help interior designers and contractors manage their business operations efficiently, so they can focus on creating beautiful spaces.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom grid md:grid-cols-2 gap-12">
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To provide interior professionals with powerful, easy-to-use tools that streamline their business operations.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border border-border">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-secondary" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the go-to platform for interior businesses worldwide.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">What Drives Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="bg-card rounded-2xl p-8 border border-border text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <v.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{v.title}</h3>
                  <p className="text-muted-foreground">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-secondary/90" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-intorza-amber/10 rounded-full blur-3xl" />
          <div className="container-custom max-w-4xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-secondary-foreground/90 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              Part of the Revenuxe family
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-foreground mb-6 leading-tight">
              A Product by <span className="text-primary">Revenuxe</span>
            </h2>
            <p className="text-lg md:text-xl text-secondary-foreground/70 max-w-2xl mx-auto mb-10">
              Intorza is proudly built and backed by Revenuxe — a studio crafting modern SaaS products that help small businesses run smarter, faster, and more beautifully.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg" asChild>
              <a href="https://www.revenuxe.com" target="_blank" rel="noopener noreferrer">
                Visit Revenuxe <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </section>

        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Ready to Join Our Community?</h2>
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <a href="https://www.app.intorza.com" target="_blank" rel="noopener noreferrer">
                Get Started Free <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <p className="mt-6 text-primary-foreground/70 text-sm">
              Or <Link to="/contact" className="underline">contact us</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
