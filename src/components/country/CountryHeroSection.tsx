import { Button } from "@/components/ui/button";
import { ArrowRight, FolderOpen, Users } from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.png";
import type { CountryData } from "@/data/countries";

const CountryHeroSection = ({ country }: { country: CountryData }) => {
  const benefits = ["No credit card required", "Setup in 2 minutes", "Instant access"];
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
              Best <span className="text-gradient">Interior Design Software</span> in {country.name}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up-delayed">
              {country.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" asChild>
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  Create Quotation <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  <FolderOpen className="w-5 h-5 mr-2" />
                  My Projects
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              {benefits.map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-intorza-green/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-intorza-green" />
                  </div>
                  {b}
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />
            <div className="relative bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-intorza-amber" />
                <div className="w-3 h-3 rounded-full bg-intorza-green" />
              </div>
              <img src={dashboardPreview} alt={`Intorza dashboard for ${country.name}`} className="w-full h-auto" />
            </div>
            <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-4 border border-border">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-primary">500+</div>
              </div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryHeroSection;
