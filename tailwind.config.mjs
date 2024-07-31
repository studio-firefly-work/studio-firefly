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
          'base-100': '#FFF9EE',
          'base-200': '#FFF9EE',
          'base-300': '#E0D9CC',
          'base-content': '#1E1B13',
          accent: '#284A34',
          'accent-content': '#FFFFFF',

          '--surface-container-lowest': '#FFFFFF',
          '--surface-container-low': '#FAF3E5',
          '--surface-container': '#F4EDDF',
          '--surface-container-high': '#EEE8DA',
          '--surface-container-highest': '#E8E2D4',
          '--outline': '#645F50',
          '--primary-container': '#857425',
          '--primary-container-content': '#FFFFFF',
          '--secondary-container': '#7D7455',
          '--secondary-container-content': '#FFFFFF',
          '--accent-container': '#597D64',
          '--accent-container-content': '#FFFFFF',
          '--error-container': '#DA342E',
          '--error-container-content': '#FFFFFF'
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          primary: '#E0CA72',
          'primary-content': '#1C1600',
          secondary: '#D6CAA5',
          'secondary-content': '#1B1602',
          error: '#FFBAB1',
          'error-content': '#370001',
          'base-100': '#3C3930',
          'base-200': '#15130B',
          'base-300': '#15130B',
          'base-content': '#FFFAF5',
          accent: '#ADD4B7',
          'accent-content': '#001B0C',

          '--surface-container-lowest': '#100E07',
          '--surface-container-low': '#1E1B13',
          '--surface-container': '#222017',
          '--surface-container-high': '#2D2A21',
          '--surface-container-highest': '#38352B',
          '--outline': '#A9A292',
          '--primary-container': '#A3903F',
          '--primary-container-content': '#000000',
          '--secondary-container': '#9A916F',
          '--secondary-container-content': '#000000',
          '--accent-container': '#75997F',
          '--accent-container-content': '#000000',
          '--error-container': '#FF5449',
          '--error-container-content': '#000000'
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
