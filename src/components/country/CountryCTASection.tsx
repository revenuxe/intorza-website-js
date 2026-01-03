import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, FileText, Receipt, Users } from "lucide-react";
import { CountryData } from "@/data/countries";

interface CountryCTASectionProps {
  country: CountryData;
}

const CountryCTASection = ({ country }: CountryCTASectionProps) => {
  const actions = [
    { icon: FileText, label: "Create Quotation", color: "bg-primary/10 text-primary" },
    { icon: Receipt, label: "Generate Invoice", color: "bg-intorza-amber/20 text-intorza-amber" },
    { icon: Users, label: "Manage Clients", color: "bg-intorza-green/20 text-intorza-green" },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Animated particles */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary-foreground/30 rounded-full animate-ping" />
      <div className="absolute bottom-20 right-10 w-3 h-3 bg-primary-foreground/20 rounded-full animate-bounce" />
      <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary-foreground/40 rounded-full animate-pulse" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0V0zm39 0h1v40h-1V0zM0 0h40v1H0V0zm0 39h40v1H0v-1z'/%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-primary-foreground/90 text-sm font-medium mb-8 border border-primary-foreground/20">
            <Sparkles className="w-4 h-4" />
            {country.trustedByText}
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Start Managing Your
            <br />
            Interior Projects in {country.name}
          </h2>

          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
            Join hundreds of interior designers and contractors in {country.name} who have streamlined their 
            business operations with Intorza. Create professional quotations and invoices in minutes!
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            {actions.map((action) => (
              <a
                key={action.label}
                href="https://app.intorza.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-xl text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 border border-primary-foreground/20 hover:scale-105"
              >
                <action.icon className="w-5 h-5" />
                {action.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="xl"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              asChild
            >
              <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50"
              asChild
            >
              <a href="mailto:intorza.com@gmail.com">
                Contact Us
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-primary-foreground/60 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-intorza-green animate-pulse" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-intorza-green animate-pulse" />
              Setup in 2 minutes
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-intorza-green animate-pulse" />
              Cloud-based solution
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryCTASection;
