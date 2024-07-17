/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'selector',
  daisyui: {
    themes: [{
      light: {
        ...require("daisyui/src/theming/themes")["light"],
        primary: '#e0ca72',
        secondary: '#d6caa5',
      },
    },],
    darkTheme: "dark", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    plugin(({ addVariant }) => {
      addVariant('where', ':where(&)')
    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#8eacbb',
          DEFAULT: '#607d8b',
          dark: '#34515e',
        },
        secondary: {
          light: '#4f83cc',
          DEFAULT: '#1565c0',
          dark: '#003c8f',
        },
        tertiary: {
          light: '#fff59d',
          DEFAULT: '#fdd835',
          dark: '#f9a825',
        },
        success: '#66bb6a',
        error: '#e53935',
        warning: '#ffa726',
        info: '#42a5f5',
        surface: '#ffffff',
        background: '#f5f5f5',
        text: {
          primary: '#212121',
          secondary: '#757575',
        },
      }
    },
    fontFamily: {
      body: ['"Noto Sans"', '"Noto Sans JP"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Hiragino Sans"', '"Noto Sans CJK JP"', '"Original Yu Gothic"', '"Yu Gothic"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Sans Emoji"'],
    },
  },
}
