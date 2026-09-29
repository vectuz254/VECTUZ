 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: '#00e87a',
        'brand-gold': '#f5c842',
        'brand-blue': '#3a8fe8',
        'brand-red': '#e84444',
        card: '#141920',
        bgdark: '#090b0e',
      },
      fontFamily: {
        sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      keyframes: {
        shiny: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        shiny: 'shiny 6s linear infinite',
      },
    },
  },
  plugins: [],
};