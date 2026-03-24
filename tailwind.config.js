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
      'sm': '8px',
      DEFAULT: '16px',
      'md': '16px',
      'lg': '16px',
      'xl': '16px',
      '2xl': '16px',
      '3xl': '16px',
      'full': '9999px',
    },
    extend: {
      colors: {
        deepBlue: '#000926',
        gold: '#C9A227',
        iceBlue: '#D6E6F3',
        sapphire: '#0E52B8',
        accent: '#FFFFFF',
        background: '#F5F5F5',
        dark: '#333333',
      },
      fontFamily: {
        heading: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Ubuntu', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 4px 14px 0 rgba(201, 162, 39, 0.4)',
        'gold-lg': '0 8px 25px 0 rgba(201, 162, 39, 0.5)',
        'sapphire': '0 4px 14px 0 rgba(14, 82, 184, 0.4)',
        'sapphire-lg': '0 8px 25px 0 rgba(14, 82, 184, 0.5)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
