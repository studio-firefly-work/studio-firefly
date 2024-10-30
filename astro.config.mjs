import { defineConfig } from 'astro/config'
import { loadEnv } from 'vite'
import fs from 'fs';
import daisyui from 'daisyui'
import node from '@astrojs/node'
import partytown from '@astrojs/partytown'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
const { SITE, BASE, SSL_KEY_PATH, SSL_CERT_PATH } = loadEnv(process.env.NODE_ENV, process.cwd(), '')

const httpsOptions = {
  key: fs.readFileSync(SSL_KEY_PATH), // プライベートキーの読み込み
  cert: fs.readFileSync(SSL_CERT_PATH), // 証明書の読み込み
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  base: BASE,
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [partytown(), sitemap(), tailwind(), react()],
  plugins: [daisyui],
  server: {
    host: true,
  },
  vite: {
    server: {
      https: httpsOptions
    }
  },
})
