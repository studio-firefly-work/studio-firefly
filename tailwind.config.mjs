/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#e0ca72',
        'secondary': '#d6caa5',
        'tertiary': '#add4b7',
        'error': '#ffbab1',
      },
    },
    fontFamily: {
      body: [
        '"Noto Sans"',
        '"Noto Sans JP"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Hiragino Sans"',
        '"Noto Sans CJK JP"',
        '"Original Yu Gothic"',
        '"Yu Gothic"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Sans Emoji"'
      ]
    }
  },
  plugins: [],
}
