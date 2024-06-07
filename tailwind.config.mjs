/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: '#e0ca72',
        secondary: '#d6caa5',
        tertiary: '#add4b7',
        error: '#ffbab1',
      },
      maxWidth: {
        artboard: '1920px',
        content: '1024px',
      },
    },
    fontFamily: {
      body: ['"Noto Sans"', '"Noto Sans JP"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Hiragino Sans"', '"Noto Sans CJK JP"', '"Original Yu Gothic"', '"Yu Gothic"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Sans Emoji"'],
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('where', ':where(&)')
    }),
  ],
}
