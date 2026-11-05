/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#090B12',
          soft: '#0E121C',
        },
        surface: {
          DEFAULT: '#172031',
          hover: '#1C2740',
        },
        lavender: {
          DEFAULT: '#BFA0EC',
          dim: '#A888D9',
        },
        cyan: {
          DEFAULT: '#67CCD8',
          dim: '#4FB8C4',
        },
        parchment: '#F0EFF4',
        muted: '#A8ACB8',
        line: '#2A3548',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        editorial: '0 24px 80px rgba(0, 0, 0, 0.35)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(191, 160, 236, 0.35), 0 0 10px rgba(103, 204, 216, 0.15)' },
          '100%': { boxShadow: '0 0 18px rgba(191, 160, 236, 0.5), 0 0 24px rgba(103, 204, 216, 0.2)' }
        }
      }
    },
  },
  plugins: [],
}
