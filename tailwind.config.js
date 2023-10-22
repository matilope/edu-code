/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {
      focus: {
        'input-focus': 'border-color: #72ba47; box-shadow: 2px solid #72ba47; background-color: red;',
      }
    },
  },
  plugins: [],
}

