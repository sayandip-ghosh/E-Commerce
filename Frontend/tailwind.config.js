/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        button: '#632A1A',
        background: '#E2D4C0',
        headers: '#934516',
        text: '#2D211C',
      },
    },
  },
  plugins: [],
}

