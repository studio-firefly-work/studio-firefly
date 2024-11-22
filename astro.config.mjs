import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import fs from 'fs'
import daisyui from 'daisyui'
import icon from 'astro-icon'
import htmx from 'astro-htmx'
import compress from "astro-compress"
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import alpinejs from '@astrojs/alpinejs';

const { SITE, BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    icon({ iconDir: "src/assets/icons" }),
    htmx(),
    sitemap(),
    tailwind(),
    react(),
    alpinejs(),
    compress()
  ],
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