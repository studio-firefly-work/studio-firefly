import { defineConfig } from 'astro/config'
import { loadEnv } from "vite";
import daisyui from 'daisyui'
import node from '@astrojs/node'
import tailwind from '@astrojs/tailwind'

const { SITE, BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind()],
  plugins: [daisyui],
  server: {
    host: true,
  },
})
