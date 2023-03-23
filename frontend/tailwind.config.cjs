/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        electric: '#db00ff',
        ribbon: '#0047ff',
        yellowL: '#fbf8cc',
        yellowM: '#fdf579',
        yellowD: '#fff125',
        brownL: '#cca05d',
        brownD: '#9a7946',
        blueC: '#9FDDFF',
        greenC: '#CCF486',
      },
      transitionProperty: {
        'spacing': 'margin, padding'
      }
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
  ],
}