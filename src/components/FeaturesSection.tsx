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
import quotationPreview from "@/assets/quotation-preview.png";
import invoicePreview from "@/assets/invoice-preview.png";
import clientsPreview from "@/assets/clients-preview.png";

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

const FeaturesSection = () => {
  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Section Header */}
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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

        {/* Feature Showcases */}
        <div className="space-y-32">
          {/* Quotation Builder Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Quotation Builder
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Create Professional Quotations in Minutes
              </h3>
              <p className="text-muted-foreground mb-6">
                Build detailed quotations with our intuitive builder. Add items, 
                customize pricing, apply discounts, and generate professional PDFs 
                that impress your clients.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Customizable quotation templates",
                  "Auto-calculate totals with tax",
                  "Track quotation status in real-time",
                  "Convert to invoice with one click",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-5 h-5 rounded-full bg-intorza-green/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-intorza-green" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="default" size="lg" asChild className="group">
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  Create Quotation
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                <img
                  src={quotationPreview}
                  alt="Quotation Builder"
                  className="relative rounded-2xl shadow-lg border border-border group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Invoice Management Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-secondary/10 rounded-3xl blur-2xl group-hover:bg-secondary/20 transition-colors duration-500" />
                <img
                  src={invoicePreview}
                  alt="Invoice Management"
                  className="relative rounded-2xl shadow-lg border border-border group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500"
                />
              </div>
            </div>
            <div>
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Invoice Management
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Effortless Invoicing & Payment Tracking
              </h3>
              <p className="text-muted-foreground mb-6">
                Generate invoices from accepted quotations instantly. Track partial 
                payments, send reminders, and get a clear view of your outstanding 
                balances.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "One-click invoice generation",
                  "Partial payment tracking",
                  "Payment status overview",
                  "Download & share PDF invoices",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-5 h-5 rounded-full bg-intorza-green/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-intorza-green" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="default" size="lg" asChild className="group">
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  Create Invoice
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          {/* Client Management Showcase */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                Client Management
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Build Lasting Client Relationships
              </h3>
              <p className="text-muted-foreground mb-6">
                Keep all your client information organized in one place. Track 
                project history, monitor billing status, and maintain detailed 
                records for each relationship.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Complete client profiles",
                  "Project history at a glance",
                  "Billing summary per client",
                  "Outstanding balance tracking",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-5 h-5 rounded-full bg-intorza-green/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-intorza-green" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="default" size="lg" asChild className="group">
                <a href="https://app.intorza.com" target="_blank" rel="noopener noreferrer">
                  Manage Clients
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
                <img
                  src={clientsPreview}
                  alt="Client Management"
                  className="relative rounded-2xl shadow-lg border border-border group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
