import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://gabriel99aa.github.io/DeSiCi',
  build: {
    sourcemap: true,
  },
  server: {
    host: true,
    port: 3210,
  },
})
