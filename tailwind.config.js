/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        head: ['"Outfit"', "sans-serif"],
        body: ['"Inter"', "sans-serif"],
        mono: ['"Source Code Pro"', "monospace"],
      },
      colors: {
        ink: "#0a0a0a",
        paper: "#F9F6F0",
        dim: "#f5f5f4",
        accent: "#4F46E5",
        "accent-light": "#EEF2FF",
        muted: "#78716c",
      },
    },
  },
};
