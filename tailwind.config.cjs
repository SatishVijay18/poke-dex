/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

/*eslint-env node*/
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixelify: ["Pixelify Sans", "sans-serif"],
        lobster: ["Lobster", "sans-serif"],
      },
      animation: {
        // Bounces 5 times 1s equals 5 seconds
        "bounce-short": "bounce 1s ease-in-out 1.5",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
