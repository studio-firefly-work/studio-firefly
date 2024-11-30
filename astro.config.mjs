import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import daisyui from 'daisyui'
import icon from 'astro-icon'
import htmx from 'astro-htmx'
import compress from 'astro-compress'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import alpinejs from '@astrojs/alpinejs'
import playformInline from '@playform/inline';
const { SITE, BASE } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [
    icon({ iconDir: 'src/assets/icons' }),
    htmx(),
    sitemap(),
    tailwind(),
    alpinejs(),
    compress(),
    playformInline(),
  ],
  plugins: [daisyui],
})