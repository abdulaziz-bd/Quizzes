/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: "#28194b",
        // primary: '#7D49F8',
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
