module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '375px',
        'md': '1040px',
        'lg': '1440px', 
        'smm': {'max': '375px'},
        'mdm': {'max': '1040px'},
        'lgm': {'max': '1440px'},
      },
      gridTemplateColumns:
      {
        'main-c' : 'minmax(50px , 1fr) minmax(450px , 1fr) minmax(50px , 1fr)',
        'main-cm' : 'minmax(24px , 1fr) minmax(270px , 1fr) minmax(24px , 1fr)',
      },
      fontFamily: {
        'josefin' :['Josefin Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
