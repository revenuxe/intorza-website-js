import Link from "next/link";
import { Mail, MapPin, Linkedin, Twitter, Instagram, Globe, ChevronDown } from "lucide-react";
import intorzaLogo from "@/assets/intorza-logo.webp";
import { countries, getCountriesByRegion } from "@/data/countries";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const countriesByRegion = getCountriesByRegion();

  const product = [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
  ];
  const company = [
    { label: "About Us", to: "/about" as const },
    { label: "Careers", to: "/careers" as const },
    { label: "Blog", to: "/blog" as const },
    { label: "Contact", to: "/contact" as const },
  ];
  const legal = [
    { label: "Terms & Conditions", to: "/terms" as const },
    { label: "Privacy Policy", to: "/privacy" as const },
    { label: "Cookie Policy", to: "/cookies" as const },
    { label: "Refund Policy", to: "/refund" as const },
  ];

  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground pt-20 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2">
            <img src={intorzaLogo.src} alt="Intorza" className="h-12 w-auto mb-6 brightness-0 invert" />
            <p className="text-secondary-foreground/70 mb-6 max-w-sm">
              Streamline your interior business operations with Intorza. From site measurements to
              invoices, manage everything in one place.
            </p>
            <div className="space-y-3">
              <a href="mailto:intorza.com@gmail.com" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" /> intorza.com@gmail.com
              </a>
              <div className="flex items-center gap-3 text-secondary-foreground/70">
                <MapPin className="w-5 h-5" /> Bangalore, India
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              {product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {company.map((link) => (
                <li key={link.label}>
                  <Link href={link.to} className="text-secondary-foreground/70 hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.to} className="text-secondary-foreground/70 hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-2 text-secondary-foreground/70">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">Available in 50+ countries:</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-secondary-foreground/5 border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10">
                  <Globe className="w-4 h-4 mr-2" />
                  Select Your Country
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64">
                <ScrollArea className="h-80">
                  {Object.entries(countriesByRegion).map(([region, regionCountries]) => (
                    <div key={region}>
                      <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                        {region}
                      </DropdownMenuLabel>
                      {regionCountries.map((c) => (
                        <DropdownMenuItem key={c.code} asChild>
                          <Link href={`/${c.slug}`} className="cursor-pointer">
                            {c.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                    </div>
                  ))}
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {["us", "uk", "ae", "au", "ca", "sg", "de", "fr"].map((code) => {
              const c = countries.find((x) => x.code === code);
              if (!c) return null;
              return (
                <Link
                  key={code}
                  href={`/${c.slug}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary-foreground/5 text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  {c.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              © {currentYear} Intorza. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/5 flex items-center justify-center text-secondary-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all" aria-label="social">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
