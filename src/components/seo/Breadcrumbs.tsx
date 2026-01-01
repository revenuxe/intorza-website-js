import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "./SchemaMarkup";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  const allItems = [
    { name: "Home", url: "https://intorza.com" },
    ...items,
  ];

  return (
    <>
      <BreadcrumbSchema items={allItems} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}
      >
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-primary transition-colors"
          aria-label="Home"
        >
          <Home className="w-4 h-4" />
          <span className="sr-only">Home</span>
        </Link>
        {items.map((item, index) => (
          <div key={item.url} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            {index === items.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.url.replace("https://intorza.com", "")}
                className="hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Breadcrumbs;
