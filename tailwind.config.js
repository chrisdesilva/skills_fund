module.exports = {
  theme: {
    inset: {
      '0': 0,
      '50': '50%'
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#9d1996',
      'secondary': '#14a5a9',
      'tertiary': 'rgb(246, 134, 14)',
      'purple-150': '#fce4fc'
    }),
    textColor: theme => ({
      ...theme('colors'),
      'primary': '#9d1996',
      'secondary': '#14a5a9',
      'white': '#fff' 
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'primary': '#9d1996',
      'secondary': '#14a5a9'
    }),
    extend: {}
  },
  variants: {},
  plugins: []
}
