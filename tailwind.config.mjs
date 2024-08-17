import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: ['class', '[data-theme="dark"]'],
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [require('daisyui')],
  theme: {
    extend: {
      colors: {
        'surface-container-lowest': 'var(--surface-container-lowest)',
        'surface-container-low': 'var(--surface-container-low)',
        'surface-container': 'var(--surface-container)',
        'surface-container-high': 'var(--surface-container-high)',
        'surface-container-highest': 'var(--surface-container-highest)'
      }
    },
    fontFamily: {
      body: ['"Noto Sans Variable"', '"Noto Sans JP Variable"', ...defaultTheme.fontFamily.sans]
    }
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          primary: '#4F4200',
          'primary-content': '#FFFFFF',
          secondary: '#4A4327',
          'secondary-content': '#FFFFFF',
          error: '#8C0009',
          'error-content': '#FFFFFF',
          'base-content': '#1E1B13',
          accent: '#284A34',
          'accent-content': '#FFFFFF',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#E0CA72',
          'primary-content': '#1C1600',
          secondary: '#D6CAA5',
          'secondary-content': '#1B1602',
          error: '#FFBAB1',
          'error-content': '#370001',
          'base-content': '#FFFAF5',
          accent: '#ADD4B7',
          'accent-content': '#001B0C',
        }
      }
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root',
  }
}
