import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(() => ({
  base: '/static/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'frontend/dist',
    emptyOutDir: true,
  },
}))