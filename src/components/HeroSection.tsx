import { Button } from "@/components/ui/button";
import { ArrowRight, FolderOpen } from "lucide-react";
import DashboardShowcase from "@/components/DashboardShowcase";

interface Props {
  title?: React.ReactNode;
  subtitle?: string;
}

const HeroSection = ({ title, subtitle }: Props) => {
  const benefits = ["No credit card required", "Setup in 2 minutes", "Instant access"];
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="container-custom relative z-10">
        <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
              {title ?? (
                <>
                  Best <span className="text-gradient">Interior Design Software</span> for Project
                  Management
                </>
              )}
            </h1>
            <DashboardShowcase alt="Intorza dashboard preview" className="my-10 md:my-12" />

            <div className="flex flex-col gap-4 justify-center mb-8 animate-fade-up-delayed max-w-[640px] mx-auto">
              <Button size="lg" asChild className="group">
                <a href="https://www.app.intorza.com" target="_blank" rel="noopener noreferrer">
                  Create Quotation
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.app.intorza.com" target="_blank" rel="noopener noreferrer">
                  <FolderOpen className="w-5 h-5 mr-2" />
                  My Projects
                </a>
              </Button>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-up-delayed">
              {subtitle ??
                "All-in-one interior design project management software with quotation builder, invoice generator, client management & team collaboration. Trusted by 500+ interior designers and contractors worldwide."}
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center animate-fade-up-delayed">
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

      </div>
    </section>
  );
};

export default HeroSection;
