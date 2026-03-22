import path from 'path'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0',
      DEFAULT: '0',
      'md': '0',
      'lg': '0',
      'xl': '0',
      '2xl': '0',
      '3xl': '0',
      'full': '0',
    },
    extend: {
      colors: {
        primary: '#0D3B66',
        secondary: '#FF6F3C',
        accent: '#FFFFFF',
        background: '#F5F5F5',
        dark: '#333333',
      },
      fontFamily: {
        heading: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
