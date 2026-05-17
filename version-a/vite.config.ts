import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Base path set to /version-a/ so nginx can serve it under that route
export default defineConfig({
  plugins: [react()],
  base: '/version-a/',
})
