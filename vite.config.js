import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "lucide-react"
    ]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core runtime — tiny, always needed
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // Framer Motion — large animation library, cache separately
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-framer';
          }
          // Lenis smooth scroll — deferred init, split out
          if (id.includes('node_modules/lenis')) {
            return 'vendor-lenis';
          }
          // Lucide React icons — small, used in initial bundle (Navbar, Hero CTAs)
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-lucide';
          }
          // react-icons/si — Simple Icons (used by TechOrbitSphere, lazy-loaded)
          if (id.includes('node_modules/react-icons/si')) {
            return 'vendor-icons-si';
          }
          // react-icons/fa — Font Awesome (used in projects, lazy-loaded)
          if (id.includes('node_modules/react-icons/fa')) {
            return 'vendor-icons-fa';
          }
          // react-icons — any other sub-packages
          if (id.includes('node_modules/react-icons')) {
            return 'vendor-icons-misc';
          }
        },
      },
    },
    // Warn if any chunk exceeds 500KB
    chunkSizeWarningLimit: 500,
  },
})

