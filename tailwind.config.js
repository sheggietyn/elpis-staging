/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37", // Gold
        "primary-dark": "#B68B2D",
        "primary-light": "#FFE082",
        secondary: "#4B0082", // Purple
        "secondary-light": "#6A1B9A",
        border: "#E0E0E0",
        "burnt-orange": "#BA5A00",
        "earthy-brown": "#5D4037",
        "rust-red": "#A8442A",
        "warm-taupe": "#A1887F",
      },
    },
  },
  plugins: [],
};
