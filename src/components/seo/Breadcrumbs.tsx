import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav className={cn("flex items-center space-x-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap pb-2 md:pb-0", className)}>
      <Link
        href="/"
        className="flex items-center hover:text-primary transition-colors"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={item.url} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          {index === items.length - 1 ? (
            <span className="font-medium text-foreground truncate max-w-[200px] md:max-w-none">
              {item.name}
            </span>
          ) : (
            <Link
              href={item.url}
              className="hover:text-primary transition-colors"
            >
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
