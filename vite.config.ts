import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// When deploying to GitHub Pages under a repository named `weddingapp`
// the base path must point to `/weddingapp/` so that all asset URLs
// are prefixed correctly. Without this Vite will emit links beginning
// with `/` which resolve to the root of the domain and lead to 404s.
export default defineConfig({
  // GitHub Pages is case-sensitive when the repository name contains
  // upper-case letters. The real repo is named "Weddingapp" so we must
  // match the casing in the base URL. Either rename the repo to all
  // lower-case or keep this value in sync with the URL you actually use.
  base: '/Weddingapp/',
  plugins: [react()],
})
