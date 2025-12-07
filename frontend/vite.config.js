import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000, // default port for Vite
    proxy: {
      '/api': {
        target: 'https://perfumeshop-backend.onrender.com',
      }}},
  plugins: [react()],
})
