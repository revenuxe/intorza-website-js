import { createStart, createMiddleware } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

import { renderErrorPage } from "./lib/error-page";
import { attachSupabaseAuth } from "@/integrations/supabase/auth-attacher";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

/**
 * Cache-Control policy per URL path family. Applied to GET requests only.
 * Values are conservative: short browser TTL, longer edge TTL, generous SWR.
 * Authenticated / mutating / API routes are excluded (no-store).
 */
function cacheHeaderFor(pathname: string, method: string): string | null {
  if (method !== "GET" && method !== "HEAD") return "private, no-store";
  if (pathname.startsWith("/_authenticated")) return "private, no-store";
  if (pathname.startsWith("/auth")) return "private, no-store";
  if (pathname.startsWith("/api/")) return null; // let the handler decide
  if (pathname.startsWith("/_serverFn")) return null; // TSS RPC — server-fn owns it

  // Static-ish content pages (country / city / marketing) — change rarely.
  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname === "/careers" ||
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/cookies" ||
    pathname === "/refund" ||
    /^\/[a-z-]+(\/[a-z-]+)?$/.test(pathname) // /$country, /$country/$city
  ) {
    return "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400";
  }

  // Blog — updates more often.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return "public, max-age=60, s-maxage=300, stale-while-revalidate=3600";
  }

  // Default SSR page policy.
  return "public, max-age=60, s-maxage=300, stale-while-revalidate=3600";
}

const cacheControlMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    const req = getRequest();
    const url = new URL(req.url);
    const value = cacheHeaderFor(url.pathname, req.method);
    if (value) {
      setResponseHeader("Cache-Control", value);
      // Vary on Accept-Encoding is standard for compressed HTML.
      setResponseHeader("Vary", "Accept-Encoding");
    }
  } catch {
    /* non-fatal — never block a request over caching */
  }
  return await next();
});

export const startInstance = createStart(() => ({
  functionMiddleware: [attachSupabaseAuth],
  requestMiddleware: [errorMiddleware, cacheControlMiddleware],
}));
