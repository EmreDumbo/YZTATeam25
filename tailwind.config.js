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
            transform: 'translateY(0) rotate(0deg)', 
            opacity: '0.7' 
          },
          '50%': { 
            transform: 'translateY(-30px) rotate(180deg)', 
            opacity: '0.9' 
          }
        },
        'capsule-drift': {
          '0%': { 
            transform: 'translateX(-100px) rotate(0deg)', 
            opacity: '0' 
          },
          '50%': { 
            opacity: '0.8' 
          },
          '100%': { 
            transform: 'translateX(100vw) rotate(360deg)', 
            opacity: '0' 
          }
        },
        'medical-pulse': {
          '0%, 100%': { 
            'background-position': '0% 50%', 
            filter: 'brightness(1)' 
          },
          '50%': { 
            'background-position': '100% 50%', 
            filter: 'brightness(1.1)' 
          }
        }
      },
      animation: {
        'pill-float': 'pill-float 6s ease-in-out infinite',
        'capsule-drift': 'capsule-drift 15s linear infinite',
        'medical-pulse': 'medical-pulse 20s ease infinite'
      }
    }
  },
  plugins: []
}
