import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export interface BreadcrumbItem {
  name: string;
  url: string; // absolute URL
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = "" }: Props) => (
  <nav aria-label="Breadcrumb" className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
    <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors" aria-label="Home">
      <Home className="w-4 h-4" />
      <span className="sr-only">Home</span>
    </Link>
    {items.map((item, index) => {
      const path = item.url.replace(SITE_URL, "") || "/";
      const isLast = index === items.length - 1;
      return (
        <div key={item.url} className="flex items-center gap-2">
          <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
          {isLast ? (
            <span className="text-foreground font-medium" aria-current="page">{item.name}</span>
          ) : (
            <a href={path} className="hover:text-primary transition-colors">{item.name}</a>
          )}
        </div>
      );
    })}
  </nav>
);

export default Breadcrumbs;

export function breadcrumbListSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: it.url,
      })),
    ],
  };
}
