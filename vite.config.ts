import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// When deploying to GitHub Pages under a repository named `weddingapp`
// the base path must point to `/weddingapp/` so that all asset URLs
// are prefixed correctly. Without this Vite will emit links beginning
// with `/` which resolve to the root of the domain and lead to 404s.
export default defineConfig({
  base: '/weddingapp/',
  plugins: [react()],
})
