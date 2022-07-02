/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pdftemplates/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  themes: [
    {
      mytheme: {
        "primary": "#6419E6",
        "secondary": "#60a5fa",
        "accent": "#1FB2A6",
        "neutral": "#191D24",
        "base-100": "#2A303C",
        "info": "#3ABFF8",
        "success": "#36D399",
        "warning": "#FBBD23",
        "error": "#F87272",
      },
    },
  ],
}
