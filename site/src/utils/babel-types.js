let types

// eslint-disable-next-line no-undef
Babel.transform('lol()', {
  plugins: [
    babel => ({
      visitor: {
        Program() {
          types = babel.types
        }
      }
    })
  ]
})

module.exports = types
