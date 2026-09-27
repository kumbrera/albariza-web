// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { blogPosts } from './src/data/blog.ts';

// Real last-modified dates in the sitemap: each article's own date, the build date elsewhere.
const postDates = new Map(blogPosts.map((p) => [`/blog/${p.slug}/`, p.dateModified ?? p.datePublished]));
const buildDate = new Date().toISOString();

// https://astro.build/config
export default defineConfig({
  // Required for @astrojs/sitemap (absolute URLs) and for canonical/og:url tags to
  // resolve correctly outside of a live request (e.g. at build time).
  site: 'https://albarizadigital.com',
  // Every URL ends in "/", matching the canonicals and what Cloudflare serves, so internal
  // links never bounce through a 307.
  trailingSlash: 'always',
  // Merged into the flagship service page. The real 301s live in public/_redirects (Cloudflare);
  // these meta-refresh pages are only the fallback.
  redirects: {
    '/servicios/ia-automatizacion': '/servicios/asesoria-procesos-automatizacion',
    '/servicios/consultoria': '/servicios/asesoria-procesos-automatizacion',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) =>
        !page.endsWith('/404/') && !page.endsWith('/servicios/ia-automatizacion/') && !page.endsWith('/servicios/consultoria/'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        return { ...item, lastmod: postDates.get(path) ?? buildDate };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle the islands' libraries at startup. Otherwise Vite finds them lazily when a
    // client:visible island first loads, re-optimizes mid-session and the open page's islands
    // fail with "Failed to fetch dynamically imported module".
    optimizeDeps: {
      include: [
        '@icons-pack/react-simple-icons',
        '@react-three/drei',
        '@react-three/fiber',
        '@react-three/rapier',
        '@tabler/icons-react',
        'gsap',
        'gsap/ScrollTrigger',
        'lucide-react',
        'meshline',
        'motion/react',
        'next-themes',
        'three',
      ],
    },
  },
});
