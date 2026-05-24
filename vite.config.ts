import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react')) return 'vendor-react'
          if (id.includes('node_modules/@supabase')) return 'vendor-supabase'
          if (id.includes('node_modules/@radix-ui')) return 'vendor-ui'
          if (id.includes('node_modules/@tiptap')) return 'vendor-editor'
          if (id.includes('node_modules/framer-motion')) return 'vendor-animation'
          if (id.includes('node_modules')) return 'vendor'
        },
      },
    },
  },
})
