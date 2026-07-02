import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Crown, Zap } from "lucide-react";

interface Props {
  price?: string;
  currency?: string;
  countryName?: string;
}

const ProCTA = ({ price = "₹1", currency = "INR", countryName }: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-intorza-navy" />
      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Crown className="w-4 h-4 text-intorza-amber" />
            <span className="text-primary-foreground/90 text-sm font-medium">Limited Time Offer</span>
            <Zap className="w-4 h-4 text-intorza-amber" />
          </div>
          <div className="mb-6">
            <span className="text-5xl md:text-7xl font-display font-bold text-primary-foreground">{price}</span>
            <span className="text-xl md:text-2xl text-primary-foreground/80 ml-2">{currency} / Month</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Unlock <span className="text-intorza-amber">Pro Features</span>
            {countryName ? ` in ${countryName}` : " Today"}
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Get unlimited quotations, advanced invoicing, team collaboration & priority support
          </p>
          <Button asChild size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl">
            <a href="https://www.app.intorza.com/" target="_blank" rel="noopener noreferrer">
              <Sparkles className="w-5 h-5 mr-2 text-intorza-amber" />
              Get Pro Now
            </a>
          </Button>
          {mounted && (
            <p className="mt-6 text-sm text-primary-foreground/60">Cancel anytime · No hidden fees · Instant access</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProCTA;
