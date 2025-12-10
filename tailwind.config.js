/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terraform: {
          50: '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#bdb4fe',
          400: '#9d8dfc',
          500: '#7c66f8',
          600: '#5c4ee5', // Primary brand color
          700: '#4c3ec3',
          800: '#3f35a4',
          900: '#342e83',
          950: '#1e1b4b',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
