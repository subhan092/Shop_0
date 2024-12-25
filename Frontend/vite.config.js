// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Make sure this is correct
    },
  },
  plugins: [react()],
})
