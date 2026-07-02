import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import intorzaLogo from "@/assets/intorza-logo.webp";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const internal = [
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ] as const;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={intorzaLogo} alt="Intorza" className="h-10 md:h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {internal.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-foreground/80 hover:text-primary font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Button variant="ghost" asChild>
            <a href="https://www.app.intorza.com" target="_blank" rel="noopener noreferrer">Login</a>
          </Button>
          <Button asChild>
            <a href="https://www.app.intorza.com" target="_blank" rel="noopener noreferrer">Create Quotation</a>
          </Button>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t border-border z-50">
          <nav className="container-custom py-6 flex flex-col gap-4">
            {internal.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-foreground/80 hover:text-primary font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-border">
              <Button variant="outline" asChild className="w-full">
                <a href="https://www.app.intorza.com" target="_blank" rel="noopener noreferrer">Login</a>
              </Button>
              <Button asChild className="w-full">
                <a href="https://www.app.intorza.com" target="_blank" rel="noopener noreferrer">Create Quotation</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
