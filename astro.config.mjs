import { defineConfig } from 'astro/config'
import daisyui from 'daisyui'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
export default defineConfig({
  site: 'https://studio-firefly.co.jp',
  base: '/',
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind()],
  plugins: [daisyui],
})
