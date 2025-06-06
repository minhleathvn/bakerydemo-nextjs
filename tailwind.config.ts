import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bakery-themed colors inspired by the original design
        bakery: {
          50: '#fefdf8',
          100: '#fdf8e8',
          200: '#fbf0c9',
          300: '#f7e2a6',
          400: '#f1cf7a',
          500: '#e9b653',
          600: '#d69e31',
          700: '#b8812a',
          800: '#956627',
          900: '#7a5324',
        },
        brown: {
          50: '#faf8f5',
          100: '#f2ebe0',
          200: '#e4d4bf',
          300: '#d0b896',
          400: '#b89768',
          500: '#a67d49',
          600: '#8b6438',
          700: '#724f2f',
          800: '#5f422a',
          900: '#523825',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config 