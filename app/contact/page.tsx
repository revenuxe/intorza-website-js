import { Metadata } from "next";
import { Mail, MapPin, Clock, MessageSquare, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react";
import Script from "next/script";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Intorza Team",
  description: "Have questions about Intorza? Contact our team for support, partnerships, or general inquiries. We're here to help streamline your interior design business.",
  keywords: "contact intorza, interior design software support, business management help, customer service, intorza support",
  alternates: {
    canonical: "https://intorza.com/contact",
  },
};

export default function ContactPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Intorza",
    "url": "https://intorza.com",
    "logo": "https://intorza.com/intorza-logo.webp",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Intorza",
    "image": "https://intorza.com/intorza-logo.webp",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressCountry": "IN"
    },
    "url": "https://intorza.com/contact"
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "intorza.com@gmail.com",
      description: "We'll respond within 24 hours",
      href: "mailto:intorza.com@gmail.com",
    },
    {
      icon: MapPin,
      title: "Our Location",
      detail: "Bangalore, India",
      description: "Interior design hub of India",
      href: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      detail: "Mon - Sat: 9AM - 6PM",
      description: "IST (Indian Standard Time)",
      href: null,
    },
  ];

  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <main className="pt-16">
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <div className="container-custom relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
                <MessageSquare className="w-4 h-4" />
                <span>We'd Love to Hear From You</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Have questions about Intorza or need assistance? Our team is here to help you streamline your interior design business.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 -mt-8 relative z-10">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((item, index) => (
                <div
                  key={item.title}
                  className="group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-primary font-medium hover:underline">
                      {item.detail}
                    </a>
                  ) : (
                    <p className="text-foreground font-medium">{item.detail}</p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <ContactForm />

              <div className="lg:pt-10">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                  Other Ways to Connect
                </h2>
                <p className="text-muted-foreground mb-10 leading-relaxed">
                  We're active on social media and love engaging with the interior design community. 
                  Follow us for tips, updates, and inspiration.
                </p>

                <div className="space-y-6">
                  <a
                    href="https://linkedin.com/company/intorza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-[#0077b5]/10 rounded-xl flex items-center justify-center group-hover:bg-[#0077b5] transition-colors">
                      <Linkedin className="w-6 h-6 text-[#0077b5] group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">LinkedIn</h4>
                      <p className="text-sm text-muted-foreground">Professional updates & news</p>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="https://instagram.com/intorza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-[#e1306c]/10 rounded-xl flex items-center justify-center group-hover:bg-[#e1306c] transition-colors">
                      <Instagram className="w-6 h-6 text-[#e1306c] group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Instagram</h4>
                      <p className="text-sm text-muted-foreground">Design inspiration & community</p>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>

                  <a
                    href="https://twitter.com/intorza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center group-hover:bg-foreground transition-colors">
                      <Twitter className="w-6 h-6 text-foreground group-hover:text-background" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Twitter</h4>
                      <p className="text-sm text-muted-foreground">Quick updates & discussions</p>
                    </div>
                    <ArrowRight className="w-5 h-5 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </a>
                </div>

                <div className="mt-12 p-8 bg-primary rounded-3xl text-primary-foreground">
                  <h3 className="text-xl font-display font-bold mb-4">Are you a designer?</h3>
                  <p className="opacity-90 mb-6">
                    Join 500+ professionals who use Intorza to manage their projects more effectively.
                  </p>
                  <Button asChild className="bg-white text-primary hover:bg-white/90 font-bold">
                    <a href="https://app.intorza.com">Get Started Free</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
