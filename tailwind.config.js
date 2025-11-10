/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1F1F1F",
        secondary: "#F5F5DC",
        light: "#FAFAFA",
        popular: "#D4A574",
      },
    },
  },
  plugins: [],
};
