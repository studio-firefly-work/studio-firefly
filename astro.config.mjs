import { defineConfig } from 'astro/config'
import { loadEnv } from "vite"
import daisyui from 'daisyui'
import node from '@astrojs/node'
import sitemap from "@astrojs/sitemap"
import tailwind from '@astrojs/tailwind'
import partytown from "@astrojs/partytown"

const { SITE, BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), "")

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [sitemap(), tailwind(), partytown()],
  plugins: [daisyui],
  server: {
    host: true
  }
})
