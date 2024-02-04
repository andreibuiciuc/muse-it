/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.vue',
    './pages/**/*.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        'muse-blue': '#3B66EC',
        'muse-dark': '#191919'
      },
    },
  },
  plugins: [],
}

