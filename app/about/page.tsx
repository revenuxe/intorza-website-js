import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Eye, Heart, Zap } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "About Intorza - Our Mission to Empower Interior Designers",
  description: "Learn about Intorza's mission to simplify business operations for interior designers and contractors. Discover our story, values, and commitment to the interior design industry.",
  keywords: "about intorza, interior design software company, intorza mission, interior business management, quotation software India",
  alternates: {
    canonical: "https://intorza.com/about",
  },
};

const aboutFAQs = [
  {
    question: "Who founded Intorza?",
    answer: "Intorza was founded by a team of passionate entrepreneurs who saw the need for a better business management solution specifically designed for interior designers and contractors in India.",
  },
  {
    question: "Where is Intorza based?",
    answer: "Intorza is headquartered in India, with a distributed team working across multiple cities. We serve interior designers and contractors throughout India and internationally.",
  },
  {
    question: "What is Intorza's mission?",
    answer: "Our mission is to provide interior professionals with powerful, easy-to-use tools that streamline their business operations, reduce administrative burden, and help them focus on creativity and client satisfaction.",
  },
];

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're on a mission to simplify business operations for interior professionals worldwide.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Every feature we build is designed with our users' needs at the center.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We continuously push boundaries to deliver cutting-edge solutions.",
  },
];

const stats = [
  { value: "500+", label: "Happy Users" },
  { value: "10K+", label: "Quotations Created" },
  { value: "₹50L+", label: "Revenue Tracked" },
  { value: "99.9%", label: "Uptime" },
];

export default function AboutPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Intorza",
    "url": "https://intorza.com",
    "logo": "https://intorza.com/intorza-logo.webp",
    "sameAs": [
      "https://facebook.com/intorza",
      "https://instagram.com/intorza",
      "https://linkedin.com/company/intorza"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": aboutFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-background">
        <main className="pt-24">
          <div className="container-custom py-4">
            <Breadcrumbs items={[{ name: "About Us", url: "https://intorza.com/about" }]} />
          </div>
          
          <section className="section-padding bg-gradient-hero">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  About Us
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Empowering Interior Professionals to{" "}
                  <span className="text-gradient">Grow Their Business</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Intorza was founded with a simple goal: to help interior designers 
                  and contractors manage their business operations efficiently, so they 
                  can focus on what they do best — creating beautiful spaces.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Our Mission
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide interior professionals with powerful, easy-to-use tools 
                    that streamline their business operations, reduce administrative 
                    burden, and help them focus on creativity and client satisfaction.
                  </p>
                </div>

                <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-secondary" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    Our Vision
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    To become the go-to platform for interior businesses worldwide, 
                    enabling them to operate more efficiently, grow sustainably, and 
                    deliver exceptional experiences to their clients.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  Our Values
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  What Drives Us
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="bg-card rounded-2xl p-8 border border-border text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding bg-primary">
            <div className="container-custom text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Join Our Community?
              </h2>
              <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Start using Intorza today and transform how you manage your interior business.
              </p>
              <Button
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
