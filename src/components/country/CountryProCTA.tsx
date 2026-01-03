import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Crown, Zap, Clock } from "lucide-react";
import { CountryData } from "@/data/countries";

interface CountryProCTAProps {
  country: CountryData;
}

const CountryProCTA = ({ country }: CountryProCTAProps) => {
  // Countdown to end of current month
  const getTimeRemaining = () => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
    const total = endOfMonth.getTime() - now.getTime();
    
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((total % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds, total };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const CountdownBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-2 md:px-4 md:py-3 min-w-[60px] md:min-w-[80px]">
        <span className="text-2xl md:text-4xl font-display font-bold text-white tabular-nums">
          {value.toString().padStart(2, '0')}
        </span>
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-lg pointer-events-none" />
      </div>
      <span className="text-white/60 text-xs md:text-sm mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-intorza-navy" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-intorza-amber/20 rounded-full blur-2xl animate-pulse delay-300" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-intorza-amber/10 rounded-full blur-xl animate-bounce delay-500" style={{ animationDuration: '4s' }} />
      </div>

      {/* Sparkle decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-8 right-[20%] w-6 h-6 text-intorza-amber/60 animate-pulse" />
        <Sparkles className="absolute bottom-12 left-[15%] w-5 h-5 text-white/40 animate-pulse delay-200" />
        <Sparkles className="absolute top-1/3 left-[10%] w-4 h-4 text-intorza-amber/40 animate-pulse delay-500" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-fade-up">
            <Crown className="w-4 h-4 text-intorza-amber" />
            <span className="text-white/90 text-sm font-medium">Limited Time Offer</span>
            <Zap className="w-4 h-4 text-intorza-amber" />
          </div>

          {/* Price highlight */}
          <div className="mb-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="inline-block relative">
              <span className="text-5xl md:text-7xl font-display font-bold text-white">
                {country.price}
              </span>
              <span className="text-xl md:text-2xl text-white/80 ml-2">
                {country.currency} / Month
              </span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            Unlock <span className="text-intorza-amber">Pro Features</span> in {country.name}
          </h2>

          {/* Subtext */}
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '300ms' }}>
            Get unlimited quotations, advanced invoicing, team collaboration & priority support
          </p>

          {/* Countdown Timer */}
          <div className="mb-8 animate-fade-up" style={{ animationDelay: '350ms' }}>
            <div className="inline-flex items-center gap-2 text-white/80 text-sm mb-4">
              <Clock className="w-4 h-4 text-intorza-amber" />
              <span>Offer ends in:</span>
            </div>
            <div className="flex justify-center gap-3 md:gap-4">
              <CountdownBox value={timeLeft.days} label="Days" />
              <div className="flex items-center text-2xl md:text-4xl text-white/40 font-bold pt-0 md:pt-1">:</div>
              <CountdownBox value={timeLeft.hours} label="Hours" />
              <div className="flex items-center text-2xl md:text-4xl text-white/40 font-bold pt-0 md:pt-1">:</div>
              <CountdownBox value={timeLeft.minutes} label="Mins" />
              <div className="flex items-center text-2xl md:text-4xl text-white/40 font-bold pt-0 md:pt-1">:</div>
              <CountdownBox value={timeLeft.seconds} label="Secs" />
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
            <Button
              asChild
              size="lg"
              className="group relative bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-xl shadow-2xl shadow-black/20 transition-all duration-300 hover:scale-105 hover:shadow-intorza-amber/30"
            >
              <a href="https://app.intorza.com/" target="_blank" rel="noopener noreferrer">
                <Crown className="w-5 h-5 mr-2 text-intorza-amber group-hover:animate-bounce" />
                Get Pro Now
                <span className="absolute -top-2 -right-2 bg-intorza-amber text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                  99% OFF
                </span>
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/60 text-sm animate-fade-up" style={{ animationDelay: '500ms' }}>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Cancel Anytime
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              No Hidden Fees
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full" />
              Instant Access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryProCTA;
