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
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['Instrument Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: '#FAF6F0',
        paper: '#F2EBE0',
        ink: {
          DEFAULT: '#1C1917',
          light: '#44403C',
        },
        terra: '#C4714B',
        sage: '#6B8F71',
        'dusty-blue': '#7A9DB5',
        gold: '#C9A84C',
        'warm-white': '#FDF9F4',
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
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'skill-fill': 'skillFill 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scroll-line': 'scrollLine 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

