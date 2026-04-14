/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  safelist: [
    { pattern: /(bg|text|border|from|to|ring)-(blue|green|orange|amber|purple|slate)-(50|100|200|300|400|500|600|700|800|900)/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
