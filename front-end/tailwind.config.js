/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,ts}",
    ],
    theme: {
      extend : {
        colors: {
          'primary' : '#e67e22',
          'tintsm' : '#fdf2e9',
          'tintmd' : '#fae5d3',
          'tintlg' : '#eb984e',
          'shadeOne' : 'cf711f',
          'shadeTwo' : '45260a'
        }
      }
    },
    plugins: [],
  }
  
  