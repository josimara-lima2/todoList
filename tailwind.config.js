/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#8284FA",
      "primar-dark": "#5e60CE",
      secondary: "#4ea8de",
      "secondary-dark": "#1e6f9f",
      "gray-700": "#0d0d0d",
      "gray-600": "#1a1a1a",
      "gray-500": "#262626",
      "gray-400": "#333333",
      "gray-300": "#808080",
      "gray-200": "#d9d9d9",
      "gray-100": "#f2f2f2",
      danger: "#e25858",
    },
  },
  plugins: [],
};
