/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dicebg: "rgb(220, 221, 230)",
      },
      boxShadow: {
        xls: "2px 4px 0px 0px rgba(0, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};
