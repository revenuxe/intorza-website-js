import { 
  LayoutDashboard, 
  Ruler, 
  FileText, 
  Receipt, 
  Users, 
  UserPlus,
  BarChart3,
  Shield,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import dashboardPreview from "@/assets/dashboard-preview.png";
import quotationPreview from "@/assets/quotation-preview.png";
import invoicePreview from "@/assets/invoice-preview.png";
import clientsPreview from "@/assets/clients-preview.png";
import teamPreview from "@/assets/team-preview.png";
import myProjectPreview from "@/assets/my-project-preview.png";
import myQuotationPreview from "@/assets/my-quotation-preview.png";
import siteMeasurementPreview from "@/assets/site-measurement-preview.png";

const features = [
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description: "Get a complete overview of your business with real-time metrics, revenue tracking, and project status at a glance.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Ruler,
    title: "Site Measurement",
    description: "Capture and organize site measurements digitally. Assign to team members and sync across all devices.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    title: "Quotation Builder",
    description: "Create professional quotations with customizable templates. Track status from pending to accepted.",
    color: "bg-intorza-green/20 text-intorza-green",
  },
  {
    icon: Receipt,
    title: "Invoice Management",
    description: "Generate invoices instantly from accepted quotations. Track payments and outstanding balances effortlessly.",
    color: "bg-intorza-amber/20 text-intorza-amber",
  },
  {
    icon: Users,
    title: "Client Management",
    description: "Maintain detailed client records with project history, billing information, and communication logs.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: UserPlus,
    title: "Team Collaboration",
    description: "Add team members, assign roles, track attendance, and manage project assignments in one place.",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description: "Gain insights with detailed reports on conversion rates, revenue trends, and project performance.",
    color: "bg-teal-500/10 text-teal-600",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with encrypted data storage. Your business data is always safe and accessible.",
    color: "bg-rose-500/10 text-rose-600",
  },
];

const showcases = [
  {
    image: dashboardPreview,
    tag: "Dashboard",
    title: "Complete Business Overview",
    description: "Monitor your entire business at a glance. Track quotations, projects, revenue, and team performance with real-time analytics.",
    points: [
      "Real-time business metrics",
      "Revenue & payment tracking",
      "Quotation & Invoice status",
      "Team attendance overview",
    ],
    ctaText: "View Dashboard",
    ctaLink: "https://app.intorza.com",
    colorClass: "bg-blue-500/10",
  },
  {
    image: siteMeasurementPreview,
    tag: "Site Measurement",
    title: "Organize Site Visits Efficiently",
    description: "Create and manage site measurements for all your projects. Assign to team members and track progress easily.",
    points: [
      "Create measurement projects",
      "Assign to team members",
      "Track site visit status",
      "Centralized location data",
    ],
    ctaText: "Start Measurement",
    ctaLink: "https://app.intorza.com",
    colorClass: "bg-primary/10",
    reverse: true,
  },
  {
    image: quotationPreview,
    tag: "Create Quotation",
    title: "Build Professional Quotations",
    description: "Create detailed quotations with customizable templates, project details, and professional formatting.",
    points: [
      "Customizable templates",
      "Auto-calculate totals with tax",
      "Professional PDF export",
      "Save client information",
    ],
    ctaText: "Create Quotation",
    ctaLink: "https://app.intorza.com",
    colorClass: "bg-intorza-green/20",
  },
  {
    image: myQuotationPreview,
    tag: "My Quotations",
    title: "Track Quotation Status",
    description: "Manage all your quotations in one place. Mark as accepted or rejected, edit details, and generate PDFs instantly.",
    points: [
      "Track pending quotations",
      "Mark accepted/rejected",
      "Edit quotation details",
      "Download PDF instantly",
    ],
    ctaText: "View Quotations",
    ctaLink: "https://app.intorza.com",
    colorClass: "bg-secondary/10",
    reverse: true,
  },
  {
    image: myProjectPreview,
    tag: "My Projects",
    title: "Manage Converted Projects",
    description: "Track all your converted projects with detailed overview including quotations, invoices, and financial summary.",
    points: [
      "Project overview dashboard",
      "Track total value & payments",
      "View associated quotations",
      "Monitor pending amounts",
    ],
    ctaText: "View Projects",
    ctaLink: "https://app.intorza.com",
    colorClass: "bg-purple-500/10",
  },
  {
    image: invoicePreview,
    tag: "Invoice Management",
    title: "Effortless Invoicing & Payments",
    description: "Generate invoices from accepted quotations instantly. Track partial payments and manage outstanding balances.",
    points: [
      "One-click invoice generation",
      "Partial payment tracking",
      "Payment progress bar",
      "Download & share PDF",
    ],
    ctaText: "Create Invoice",
    ctaLink: "https://app.intorza.com",
    colorClass: "bg-intorza-amber/20",
    reverse: true,
  },
  {
    image: clientsPreview,
    tag: "Client Management",
    title: "Build Lasting Client Relationships",
    description: "Keep all your client information organized. Track project history, billing status, and outstanding balances for each client.",
    points: [
      "Complete client profiles",
      "Project history at a glance",
      "Billing summary per client",
      "Outstanding balance tracking",
    ],
    ctaText: "Manage Clients",
    ctaLink: "https://app.intorza.com",
    colorClass: "bg-teal-500/10",
  },
  {
    image: teamPreview,
    tag: "Team Management",
    title: "Collaborate with Your Team",
    description: "Add team members, create project teams, track attendance, and manage assignments all in one place.",
    points: [
      "Add unlimited team members",
      "Create project teams",
      "Track attendance daily",
      "Assign roles & permissions",
    ],
    ctaText: "Manage Team",
    ctaLink: "https://app.intorza.com",
    colorClass: "bg-rose-500/10",
    reverse: true,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Feature Showcases with Images */}
        <div className="space-y-24 md:space-y-32 mb-32">
          {showcases.map((showcase, index) => (
            <div 
              key={showcase.tag}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                showcase.reverse ? '' : ''
              }`}
            >
              {/* Image */}
              <div className={`${showcase.reverse ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative group">
                  <div className={`absolute -inset-4 ${showcase.colorClass} rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />
                  <img
                    src={showcase.image}
                    alt={showcase.title}
                    className="relative rounded-2xl shadow-lg border border-border group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 w-full"
                  />
                </div>
                {/* CTA Button Below Image */}
                <div className="mt-6 text-center lg:text-left">
                  <Button variant="default" size="lg" asChild className="group shadow-lg hover:shadow-xl">
                    <a href={showcase.ctaLink} target="_blank" rel="noopener noreferrer">
                      {showcase.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className={`${showcase.reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4 animate-fade-up">
                  {showcase.tag}
                </span>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {showcase.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  {showcase.description}
                </p>
                <ul className="space-y-3">
                  {showcase.points.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <div className="w-5 h-5 rounded-full bg-intorza-green/20 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-intorza-green" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Powerful Features Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Powerful Features
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Everything You Need to Run Your{" "}
            <span className="text-gradient">Interior Business</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From the first site visit to the final invoice, Intorza covers every 
            aspect of your business workflow with intuitive tools designed for 
            interior professionals.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
