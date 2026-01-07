/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#1e2139', // Sidebar dark
          800: '#252945', // Sidebar lighter (hover)
        },
        light: {
          bg: '#f8f9fa', // Main background
          card: '#ffffff',
        },
        brand: {
          green: '#22c55e', // Growth green
          red: '#ef4444',   // Loss red
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Matches the clean look
      }
    },
  },
  plugins: [],
}