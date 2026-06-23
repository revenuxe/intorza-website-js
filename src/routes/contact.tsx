import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Clock } from "lucide-react";
import { SITE_URL } from "@/lib/site";

const TITLE = "Contact Us — Get in Touch with the Intorza Team";
const DESCRIPTION = "Have questions about Intorza? Contact our team for support, partnerships, or general inquiries.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/contact` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/contact` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: TITLE,
          url: `${SITE_URL}/contact`,
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const info = [
    { icon: Mail, title: "Email Us", detail: "intorza.com@gmail.com", href: "mailto:intorza.com@gmail.com" },
    { icon: MapPin, title: "Our Location", detail: "Bangalore, India" },
    { icon: Clock, title: "Business Hours", detail: "Mon - Sat: 9AM - 6PM IST" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom max-w-3xl text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Have questions about Intorza? Our team is here to help you streamline your interior design business.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom grid md:grid-cols-3 gap-6 max-w-5xl">
            {info.map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                {item.href ? (
                  <a href={item.href} className="text-primary font-medium hover:underline">{item.detail}</a>
                ) : (
                  <p className="text-foreground font-medium">{item.detail}</p>
                )}
              </div>
            ))}
          </div>

          <div className="container-custom max-w-2xl text-center mt-16">
            <Button size="lg" asChild>
              <a href="mailto:intorza.com@gmail.com">Email Our Team</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
