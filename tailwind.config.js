/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          900: "#1D1A1D",
          800: "#222222",
          700: "#555555",
          600: "#333333",
        },
      },
    },
  },
  plugins: [],
};
