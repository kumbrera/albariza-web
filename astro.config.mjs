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
        'framer-motion',
        'gsap',
        'gsap/ScrollTrigger',
        'lucide-react',
        'meshline',
        'motion/react',
        'three',
      ],
    },
  },
});
