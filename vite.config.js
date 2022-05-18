import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: '../BlackBeans-API/application/templates',
    assetsDir: './assets'
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
