/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@mui/**/*.{js,jsx,ts,tsx}"
  ],
  safelist: ['windows-scroll'],
  theme: {
    extend: {},
  },
  plugins: [],
}
