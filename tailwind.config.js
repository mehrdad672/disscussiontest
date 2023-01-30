/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          "0%": { transform: "opacity-0" },
          "100%": { transform: "opacity-100" },
        },
      },
      animation: {
        blinking: "blink 1s linear infinite",
      },
    },
  },
  plugins: [],
};
