import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// public/ holds local-development fallbacks. Production serves all media from
// R2, so remove those copies from the Pages artifact after Vite copies them.
function excludeLocalMediaFromBuild() {
  return {
    name: 'exclude-local-media-from-build',
    apply: 'build',
    async closeBundle() {
      await rm(resolve(import.meta.dirname, 'dist/videos'), { recursive: true, force: true })
      await rm(resolve(import.meta.dirname, 'dist/Resume-Avinash.pdf'), { force: true })
      await rm(resolve(import.meta.dirname, 'dist/favicon.svg'), { force: true })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), excludeLocalMediaFromBuild()],
})
