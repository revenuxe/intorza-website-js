import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    title: "Create Quotation",
    description: "Build professional quotations with our intuitive builder. Add items, pricing, and customize templates for your clients.",
  },
  {
    number: "02",
    title: "Login",
    description: "Sign up and log in to your secure Intorza account. Access your dashboard from anywhere, anytime.",
  },
  {
    number: "03",
    title: "Save & Send",
    description: "Save your quotations and send them directly to clients via email or share a professional link.",
  },
  {
    number: "04",
    title: "Manage Invoices",
    description: "Convert accepted quotations to invoices, track payments, and manage your entire billing lifecycle.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get Started in{" "}
            <span className="text-gradient">4 Simple Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Intorza is designed to be intuitive and easy to use. Start managing 
            your interior business like a pro in just minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
              >
                <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 h-full">
                  {/* Step Number */}
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-cta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (hidden on last item and mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 h-8 bg-background rounded-full items-center justify-center z-20 border border-border shadow-sm">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="hero" size="xl" asChild>
            <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
