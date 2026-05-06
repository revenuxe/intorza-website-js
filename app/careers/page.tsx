import { Metadata } from "next";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Careers at Intorza - Join Our Team",
  description: "Join Intorza and help build the future of interior design business management. Explore open positions in engineering, design, marketing, and more.",
  keywords: "intorza careers, interior design software jobs, tech jobs India, remote developer jobs, startup jobs Bangalore",
  alternates: {
    canonical: "https://intorza.com/careers",
  },
};

const openPositions = [
  {
    title: "Full Stack Developer",
    department: "Engineering",
    location: "Bangalore, India",
    type: "Full-time",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Customer Success Manager",
    department: "Support",
    location: "Bangalore, India",
    type: "Full-time",
  },
];

const benefits = [
  "Competitive salary & equity",
  "Flexible work hours",
  "Remote-friendly culture",
  "Health insurance",
  "Learning & development budget",
  "Team offsites",
];

export default function CareersPage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Intorza",
    "url": "https://intorza.com",
    "logo": "https://intorza.com/intorza-logo.webp",
  };

  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="min-h-screen bg-background">
        <main className="pt-24">
          <div className="container-custom py-4">
            <Breadcrumbs items={[{ name: "Careers", url: "https://intorza.com/careers" }]} />
          </div>
          
          <section className="section-padding bg-gradient-hero">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  Careers
                </span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  Join Us in Building the Future of{" "}
                  <span className="text-gradient">Interior Business</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  We're looking for passionate individuals who want to make a difference 
                  in how interior professionals run their businesses.
                </p>
              </div>
            </div>
          </section>

          <section className="section-padding bg-muted/30">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Why Work With Us?
                </h2>
                <p className="text-muted-foreground">
                  We offer a collaborative environment where you can grow and make an impact.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border"
                  >
                    <div className="w-3 h-3 rounded-full bg-intorza-green" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  Open Positions
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Current Openings
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-4">
                {openPositions.map((position) => (
                  <div
                    key={position.title}
                    className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                          {position.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {position.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <Button asChild>
                        <a href="mailto:intorza.com@gmail.com">
                          Apply Now
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">
                  Don't see a role that fits? We're always looking for talented people.
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:intorza.com@gmail.com">
                    Send General Application
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
