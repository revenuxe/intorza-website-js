// @lovable.dev/vite-tanstack-config already includes tanstackStart, viteReact,
// tailwindcss, tsConfigPaths, nitro (default cloudflare), componentTagger (dev),
// VITE_* env injection, @ path alias, React/TanStack dedupe, error loggers, and
// sandbox detection. Do NOT add those manually.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Allow overriding the nitro target. Default to "vercel" so `vite build` emits
// Vercel's Build Output API (.vercel/output) which Vercel auto-detects.
// Set NITRO_PRESET=cloudflare (or another preset) to override.
const nitroPreset = process.env.NITRO_PRESET ?? "vercel";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: nitroPreset,
  },
});
