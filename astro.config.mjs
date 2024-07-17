import { defineConfig } from 'astro/config'
import daisyui from "daisyui"
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/design.scss";`,
        },
      },
    },
  },
  integrations: [tailwind()],
  plugins: [
    daisyui,
  ],
})
