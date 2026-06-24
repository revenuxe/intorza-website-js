import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Receipt, Users } from "lucide-react";

interface Props {
  countryName?: string;
  trustedByText?: string;
}

const CTASection = ({ countryName, trustedByText }: Props) => {
  const actions = [
    { icon: FileText, label: "Create Quotation" },
    { icon: Receipt, label: "Generate Invoice" },
    { icon: Users, label: "Manage Clients" },
  ];
  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground/90 text-sm font-medium mb-8 border border-primary-foreground/20">
            <Sparkles className="w-4 h-4" />
            {trustedByText ?? "Trusted by 500+ Interior Professionals"}
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Start Managing Your<br />Interior Projects{countryName ? ` in ${countryName}` : " Today"}
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Join hundreds of interior designers and contractors{countryName ? ` in ${countryName}` : ""} who have streamlined their business operations with Intorza.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {actions.map((a) => (
              <a key={a.label} href="https://app.intorza.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-xl text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 border border-primary-foreground/20 hover:scale-105">
                <a.icon className="w-5 h-5" />
                {a.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                Get Started Now <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
              <a href="mailto:intorza.com@gmail.com">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
