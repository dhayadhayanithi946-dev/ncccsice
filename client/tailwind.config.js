/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        army: {
          900: '#0f2414',
          800: '#1b3b22',
          700: '#244a2b',
          600: '#2d5c36',
          500: '#3a7545',
          100: '#eaf4eb',
          50: '#f4f9f5',
        },
        gold: {
          600: '#b89218',
          500: '#d4af37',
          400: '#e5c158',
          100: '#fbf4d9',
        },
        navy: {
          900: '#0a1526',
          800: '#112239',
          700: '#1a3354',
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Inter', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
