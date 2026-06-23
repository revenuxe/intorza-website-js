import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/site";

const TITLE = "Cookie Policy — How Intorza Uses Cookies";
const DESCRIPTION = "Understand how Intorza uses cookies and tracking technologies and how to manage them.";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:url", content: `${SITE_URL}/cookies` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/cookies` }],
  }),
  component: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container-custom max-w-4xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: June 23, 2026</p>
          <div className="space-y-6 text-foreground/80">
            <p>Cookies are small text files placed on your device when you visit a website. We use essential, analytics, functional, and marketing cookies to operate and improve the Service.</p>
            <h2 className="font-display text-2xl font-semibold text-foreground pt-4">Managing Cookies</h2>
            <p>Most browsers let you view, delete, or block cookies. Blocking essential cookies may break parts of the Service.</p>
            <h2 className="font-display text-2xl font-semibold text-foreground pt-4">Contact</h2>
            <p>Email <a className="text-primary underline" href="mailto:intorza.com@gmail.com">intorza.com@gmail.com</a>.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  ),
});
