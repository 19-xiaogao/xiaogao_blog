import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3001,
    proxy: {
      '/devApi': {
        target: 'localhost:3003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/devApi/, '')
      }
    }
  }
})
