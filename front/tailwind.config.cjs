/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#191414",
        white: "#FFFFFF",
        green: "#1DB954",
        gray: "#535353",
        lightgray: "#b3b3b3",
      },
    },
  },
  plugins: [require("daisyui")],
};
