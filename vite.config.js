import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: '/Dax-Portfolio/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        webApplications: resolve(rootDir, 'web-applications.html'),
        uiUx: resolve(rootDir, 'ui-ux.html'),
        blogs: resolve(rootDir, 'blogs.html'),
      },
    },
  },
})
