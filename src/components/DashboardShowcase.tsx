import { Users } from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.webp";

export default function DashboardShowcase({ alt, className = "" }: { alt: string; className?: string }) {
  return <div className={`relative max-w-5xl mx-auto px-4 sm:px-10 animate-scale-in ${className}`}>
    <div className="absolute inset-5 bg-gradient-to-r from-primary/25 via-secondary/10 to-primary/20 rounded-[2rem] blur-3xl opacity-60 animate-pulse" />
    <div className="relative bg-card rounded-[1.65rem] shadow-[0_24px_60px_-24px_hsl(var(--foreground)/0.35)] overflow-hidden border border-border/60 ring-1 ring-white/40 hover:shadow-[0_28px_72px_-24px_hsl(var(--foreground)/0.42)] transition-shadow duration-500">
      <div className="flex items-center gap-2 px-4 sm:px-5 py-3 bg-muted/55 border-b border-border"><div className="w-3 h-3 rounded-full bg-destructive/80" /><div className="w-3 h-3 rounded-full bg-intorza-amber" /><div className="w-3 h-3 rounded-full bg-intorza-green" /></div>
      <img src={dashboardPreview.src} alt={alt} className="w-full h-auto" fetchPriority="high" decoding="async" width="1280" height="800" />
    </div>
    <div className="absolute bottom-5 left-8 sm:bottom-9 sm:left-14 bg-card/95 backdrop-blur-md rounded-2xl shadow-[0_14px_30px_-14px_hsl(var(--foreground)/0.35)] px-3 py-2.5 sm:px-4 sm:py-3 border border-border/80 animate-float"><div className="text-xl sm:text-2xl font-bold tracking-tight text-intorza-green">+45%</div><div className="text-xs sm:text-sm font-medium text-muted-foreground">Efficiency Boost</div></div>
    <div className="absolute top-5 right-8 sm:top-9 sm:right-14 bg-card/95 backdrop-blur-md rounded-2xl shadow-[0_14px_30px_-14px_hsl(var(--foreground)/0.35)] px-3 py-2.5 sm:px-4 sm:py-3 border border-border/80 animate-float-delayed"><div className="flex items-center gap-1.5 sm:gap-2"><Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" /><div className="text-xl sm:text-2xl font-bold tracking-tight text-primary">500+</div></div><div className="text-xs sm:text-sm font-medium text-muted-foreground">Happy Users</div></div>
  </div>;
}
