/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        velora: ['Velora', 'sans-serif'],
        luxury: ['LuxuryStylish', 'serif'],
        westford: ['WestfordModern', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#FBF8F1',
          100: '#F5EED9',
          200: '#EBDCB4',
          300: '#DFC68B',
          400: '#D4AF37',
          500: '#C5A028',
          600: '#A4821B',
          700: '#7E6316',
          800: '#544212',
          900: '#2D230A',
        },
        obsidian: {
          950: '#040406',
          900: '#08090d',
          850: '#0d0f15',
          800: '#12141d',
          700: '#1b1e2a',
        }
      },
      boxShadow: {
        'doppel-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
        'gold-glow': '0 0 35px -5px rgba(212, 175, 55, 0.25)',
        'luxury-ambient': '0 20px 50px -10px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
