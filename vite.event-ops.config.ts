import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/event-ops/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist-event-ops',
    emptyOutDir: true,
    rollupOptions: {
      input: 'event-ops.html',
    },
  },
})
