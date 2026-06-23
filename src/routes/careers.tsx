import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Briefcase } from "lucide-react";
import { SITE_URL } from "@/lib/site";

const TITLE = "Careers at Intorza — Join Our Team";
const DESCRIPTION = "Join Intorza and help build the future of interior design business management. Explore open positions.";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: `${SITE_URL}/careers` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/careers` }],
  }),
  component: Careers,
});

function Careers() {
  const positions = [
    { title: "Full Stack Developer", department: "Engineering", location: "Bangalore, India", type: "Full-time" },
    { title: "UI/UX Designer", department: "Design", location: "Remote", type: "Full-time" },
    { title: "Customer Success Manager", department: "Support", location: "Bangalore, India", type: "Full-time" },
  ];
  const benefits = ["Competitive salary & equity", "Flexible work hours", "Remote-friendly culture", "Health insurance", "Learning & development budget", "Team offsites"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding bg-gradient-hero">
          <div className="container-custom max-w-4xl text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Join Us in Building the Future of <span className="text-gradient">Interior Business</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              We're looking for passionate individuals who want to make a difference in how interior professionals run their businesses.
            </p>
          </div>
        </section>

        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Why Work With Us?</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border">
                  <div className="w-3 h-3 rounded-full bg-intorza-green" />
                  <span className="text-foreground">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-3xl">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Current Openings</h2>
            <div className="space-y-4">
              {positions.map((p) => (
                <div key={p.title} className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{p.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{p.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{p.type}</span>
                      </div>
                    </div>
                    <Button asChild>
                      <a href="mailto:intorza.com@gmail.com">Apply Now <ArrowRight className="w-4 h-4 ml-2" /></a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
