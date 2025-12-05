/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ekfc: {
          red: '#c8102e',
          gold: '#b38b2b',
          darkred: '#7a0019',
          cream: '#f9f5f0',
        },
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#c8102e',
          600: '#c8102e',
          700: '#7a0019',
          800: '#7a0019',
          900: '#7a0019',
        }
      }
    },
  },
  plugins: [],
}
