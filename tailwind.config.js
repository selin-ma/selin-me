/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        /* Design system tokens — Olive Grove palette */
        bg: '#F0EFE9',
        ink: {
          DEFAULT: '#1F1F1F',
          light: '#8A9B7C',
          lt: '#919191',
        },
        olive: {
          DEFAULT: '#8E9B84',
          lt: '#8A9B7C',
          bg: '#EDF2EA',
          dark: '#5A6B4C',
        },
        amber: {
          DEFAULT: '#FFBA3B',
          ink: '#3D2A00',
        },
        dark: '#1A1F18',
        /* Legacy aliases */
        cream: {
          DEFAULT: '#F0EFE9',
          lt: '#E9EBEA',
        },
        paper: '#F0EFE9',
        'warm-white': '#F0EFE9',
        midnight: '#1A1F18',
        terra: '#8E9B84',
        sage: '#8A9B7C',
        gold: '#FFBA3B',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        skillFill: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(0.75)' },
          '50%': { opacity: '1', transform: 'scale(1.25)' },
        },
      },
      transitionDuration: {
        600: '600ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'skill-fill': 'skillFill 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scroll-line': 'scrollLine 1.5s ease-in-out infinite',
        breathe: 'breathe 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
