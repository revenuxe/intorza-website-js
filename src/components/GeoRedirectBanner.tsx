import { X, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { countries } from "@/data/countries";

interface GeoRedirectBannerProps {
  countryCode: string;
  countryName: string;
  onRedirect: () => void;
  onDismiss: () => void;
}

const GeoRedirectBanner = ({
  countryCode,
  countryName,
  onRedirect,
  onDismiss,
}: GeoRedirectBannerProps) => {
  const country = countries.find(c => c.code === countryCode);

  if (!country) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-card border border-border rounded-xl shadow-2xl p-4 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Globe className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground text-sm">
              Welcome from {countryName}! 🎉
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              We have a localized page for {countryName} with local pricing and content.
            </p>
            
            <div className="flex items-center gap-2 mt-3">
              <Button
                size="sm"
                onClick={onRedirect}
                className="text-xs h-8 gap-1"
              >
                View {countryName} Page
                <ArrowRight className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="text-xs h-8 text-muted-foreground hover:text-foreground"
              >
                Stay here
              </Button>
            </div>
          </div>
          
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeoRedirectBanner;
