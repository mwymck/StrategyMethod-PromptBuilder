import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  }
})