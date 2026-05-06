"use client";

import Link from "next/link";
import { Mail, MapPin, Linkedin, Twitter, Instagram, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
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

  const footerLinks = {
    product: [
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Testimonials", href: "/#testimonials" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Refund Policy", href: "/refund" },
    ],
  };

  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground pt-20 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Image 
              src={intorzaLogo} 
              alt="Intorza" 
              width={150} 
              height={48} 
              className="h-12 w-auto mb-6 brightness-0 invert" 
            />
            <p className="text-secondary-foreground/70 mb-6 max-w-sm">
              Streamline your interior business operations with Intorza. 
              From site measurements to invoices, manage everything in one place.
            </p>
            <div className="space-y-3">
              <a href="mailto:intorza.com@gmail.com" className="flex items-center gap-3 text-secondary-foreground/70 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
                intorza.com@gmail.com
              </a>
              
              <div className="flex items-center gap-3 text-secondary-foreground/70">
                <MapPin className="w-5 h-5" />
                Bangalore, India
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Country Selector Section */}
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
                      {regionCountries.map((country) => (
                        <DropdownMenuItem key={country.slug} asChild>
                          <Link href={`/${country.slug}`} className="cursor-pointer">
                            {country.name}
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

          {/* Popular Countries Quick Links */}
          <div className="mt-4 flex flex-wrap gap-2">
            {["us", "uk", "ae", "au", "ca", "sg", "de", "fr"].map((code) => {
              const country = countries.find((c) => c.code === code);
              if (!country) return null;
              return (
                <Link
                  key={country.slug}
                  href={`/${country.slug}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary-foreground/5 text-secondary-foreground/70 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  {country.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-foreground/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/60 text-sm">
              © {currentYear} Intorza. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/company/intorza" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/5 flex items-center justify-center text-secondary-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/intorza" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/5 flex items-center justify-center text-secondary-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/intorza" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary-foreground/5 flex items-center justify-center text-secondary-foreground/60 hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
