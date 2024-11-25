import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import fs from 'fs'
import daisyui from 'daisyui'
import icon from 'astro-icon'
import htmx from 'astro-htmx'
import compress from 'astro-compress'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import partytown from '@astrojs/partytown'
import playformInline from '@playform/inline'
const { SITE, BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'hybrid',
  integrations: [
    icon({ iconDir: 'src/assets/icons' }),
    partytown({ config: { forward: ['dataLayer.push'] } }),
    htmx(),
    sitemap(),
    tailwind(),
    alpinejs(),
    compress(),
    playformInline(),
  ],
  plugins: [daisyui],
  server: {
    host: true,
  },
})
