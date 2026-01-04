import { Button } from "@/components/ui/button";
import { ArrowRight, FolderOpen, Sparkles, Users } from "lucide-react";
import dashboardPreview from "@/assets/dashboard-preview.png";
const HeroSection = () => {
  const benefits = ["No credit card required", "Setup in 2 minutes", "Instant access"];
  return <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float-delayed" />
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-primary/30 rounded-full animate-pulse" />
      <div className="absolute top-1/3 right-20 w-6 h-6 bg-intorza-amber/40 rounded-full animate-bounce" />
      <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-intorza-green/50 rounded-full animate-ping" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
    }} />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 animate-fade-up">
              Best{" "}
              <span className="text-gradient">Interior Design Software</span>{" "}
              for Project Management
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-up-delayed">
              All-in-one interior design project management software with quotation builder, 
              invoice generator, client management & team collaboration. Trusted by 500+ 
              interior designers and contractors in India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-up-delayed">
              <Button variant="hero" size="xl" asChild className="group">
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  Create Quotation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  <FolderOpen className="w-5 h-5" />
                  My Projects
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start animate-fade-up-delayed">
              {benefits.map(benefit => <div key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-intorza-green/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-intorza-green" />
                  </div>
                  {benefit}
                </div>)}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/10 to-primary/20 rounded-3xl blur-2xl opacity-60 animate-pulse" />
            <div className="relative bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50 hover:shadow-2xl transition-shadow duration-500">
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-intorza-amber" />
                <div className="w-3 h-3 rounded-full bg-intorza-green" />
              </div>
              <img src={dashboardPreview} alt="Interior Design Project Management Dashboard - Intorza" className="w-full h-auto" />
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl shadow-lg p-4 border border-border animate-float">
              <div className="text-2xl font-bold text-intorza-green">+45%</div>
              <div className="text-sm text-muted-foreground">Efficiency Boost</div>
            </div>

            <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-lg p-4 border border-border animate-float-delayed">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div className="text-2xl font-bold text-primary">500+</div>
              </div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;