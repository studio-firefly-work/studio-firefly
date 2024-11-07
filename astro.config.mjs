import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import fs from 'fs'
import daisyui from 'daisyui'
import icon from 'astro-icon'
import htmx from 'astro-htmx'
import node from '@astrojs/node'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
const { SITE, BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [icon({ iconDir: "src/assets/icons", }), htmx(), partytown(), sitemap(), tailwind(), react()],
  plugins: [daisyui],
  server: {
    host: true,
  },
  vite: {
    server: {
      https: {
        key: fs.readFileSync("./localhost-key.pem"),
        cert: fs.readFileSync("./localhost.pem")
      }
    }
  },
})