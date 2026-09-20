import { rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// public/videos/ holds a local copy of the case-study video so `npm run dev`
// works without hitting object storage. Vite copies all of public/ into dist/
// verbatim, which would put a 61 MB file in the deploy artifact — over
// Cloudflare Pages' 25 MiB per-file limit. In production the video is served
// from R2/S3 via VITE_CSI_VIDEO_URL, so drop it from the build output.
function excludeLocalVideosFromBuild() {
  return {
    name: 'exclude-local-videos-from-build',
    apply: 'build',
    async closeBundle() {
      await rm(resolve(__dirname, 'dist/videos'), { recursive: true, force: true })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), excludeLocalVideosFromBuild()],
})
