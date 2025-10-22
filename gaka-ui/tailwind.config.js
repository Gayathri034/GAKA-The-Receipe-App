/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // tell Tailwind to scan all React files for classes
  theme: {
    extend: {
      // custom animations
      keyframes: {
        zoomIn: {
          "0%": { transform: "scale(0)", opacity: "0" },  // start tiny and invisible
          "100%": { transform: "scale(1)", opacity: "1" }, // end at full size and visible
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },      // start at normal position
          "50%": { transform: "translateY(-15px)" },       // move up a little
        },
      },
      animation: {
        zoomIn: "zoomIn 0.5s ease-out forwards",           // 0.5s grow effect
        float: "float 4s ease-in-out infinite",            // slow floating background
      },
    },
  },
  plugins: [],
}

