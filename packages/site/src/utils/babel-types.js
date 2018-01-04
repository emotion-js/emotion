let types

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
