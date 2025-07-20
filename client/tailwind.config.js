/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        'pill-float': {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg) scale(1)', 
            opacity: '0.7' 
          },
          '25%': {
            transform: 'translateY(-15px) rotate(90deg) scale(1.05)',
            opacity: '0.9'
          },
          '50%': { 
            transform: 'translateY(-30px) rotate(180deg) scale(1.1)', 
            opacity: '1' 
          },
          '75%': {
            transform: 'translateY(-15px) rotate(270deg) scale(1.05)',
            opacity: '0.9'
          }
        },
        'capsule-drift': {
          '0%': { 
            transform: 'translateX(-100px) rotate(0deg) scale(1)', 
            opacity: '0' 
          },
          '10%': { 
            opacity: '0.8' 
          },
          '25%': {
            transform: 'translateX(25vw) rotate(90deg) scale(1.1)',
            opacity: '0.9'
          },
          '50%': { 
            transform: 'translateX(50vw) rotate(180deg) scale(1.2)',
            opacity: '1' 
          },
          '75%': {
            transform: 'translateX(75vw) rotate(270deg) scale(1.1)',
            opacity: '0.9'
          },
          '90%': { 
            opacity: '0.8' 
          },
          '100%': { 
            transform: 'translateX(100vw) rotate(360deg) scale(1)', 
            opacity: '0' 
          }
        },
        'medical-pulse': {
          '0%, 100%': { 
            'background-position': '0% 50%', 
            filter: 'brightness(1) hue-rotate(0deg)' 
          },
          '25%': {
            'background-position': '25% 25%',
            filter: 'brightness(1.05) hue-rotate(5deg)'
          },
          '50%': { 
            'background-position': '100% 50%', 
            filter: 'brightness(1.1) hue-rotate(10deg)' 
          },
          '75%': {
            'background-position': '75% 75%',
            filter: 'brightness(1.05) hue-rotate(5deg)'
          }
        },
        'pill-glow': {
          '0%': {
            'box-shadow': '0 4px 15px rgba(0, 0, 0, 0.2)'
          },
          '100%': {
            'box-shadow': '0 8px 25px rgba(0, 0, 0, 0.4)'
          }
        },
        'background-drift': {
          '0%, 100%': {
            'background-position': '0 0, 25px 25px, 50px 50px'
          },
          '50%': {
            'background-position': '50px 50px, 75px 75px, 100px 100px'
          }
        },
        'slide-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fadeIn': {
          'from': {
            opacity: '0'
          },
          'to': {
            opacity: '1'
          }
        },
        'shimmer': {
          '0%': {
            'background-position': '-200% 0'
          },
          '100%': {
            'background-position': '200% 0'
          }
        }
      },
      animation: {
        'pill-float': 'pill-float 6s ease-in-out infinite',
        'capsule-drift': 'capsule-drift 15s linear infinite',
        'medical-pulse': 'medical-pulse 20s ease infinite',
        'pill-glow': 'pill-glow 3s ease-in-out infinite alternate',
        'background-drift': 'background-drift 30s ease infinite',
        'slide-in-up': 'slide-in-up 0.3s ease-out',
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'shimmer': 'shimmer 2s linear infinite'
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'emerald': '0 10px 25px -3px rgba(16, 185, 129, 0.3), 0 4px 6px -2px rgba(16, 185, 129, 0.05)',
        'emerald-lg': '0 20px 35px -5px rgba(16, 185, 129, 0.3), 0 10px 10px -5px rgba(16, 185, 129, 0.04)'
      },
      backdropBlur: {
        'xs': '2px'
      }
    }
  },
  plugins: []
}
