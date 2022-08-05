/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#5064C8",
        "dark-green": "#50C878",
        "dark-pink": "#C850A0",
      },
      gridTemplateColumns: {
        16: "repeat(16, minmax(0, 1fr))",
      },
      fontFamily: {
        kdam: ["Kdam Thmor Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
