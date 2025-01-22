/// <reference types="vitest" />
import { getViteConfig } from 'astro/config'
import { configDefaults } from 'vitest/config'

export default getViteConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    globals: false,
    includeSource: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    exclude: [
      ...configDefaults.exclude,
      './src/pages/**/*'
    ]
  },
});
