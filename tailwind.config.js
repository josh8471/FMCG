export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#1e2139',
          800: '#252945',
        },
        light: {
          bg: '#f8f9d',
          card: '#ffffff',
        },
        brand: {
          green: '#22c55e',
          red: '#ef4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif', "Roboto"],
      }
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}