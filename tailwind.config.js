/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          furia: '#9146FF', 
          'furia-dark': '#7a3ecc', 
        },
      },
    },
    plugins: [],
  }