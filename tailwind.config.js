/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safeList: [
    {
      // TODO
    },
  ],
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          1: "#4da0a8",
          2: "#a7bec6",
          3: "#42b9f4",
          4: "#5b8772",
          5: "#6f6fc4",
        },
      },
    },
  },
  plugins: [],
};
