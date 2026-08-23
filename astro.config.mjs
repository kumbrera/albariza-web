// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Required for @astrojs/sitemap (absolute URLs) and for canonical/og:url tags to
  // resolve correctly outside of a live request (e.g. at build time).
  site: 'https://albarizadigital.com',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.endsWith('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
