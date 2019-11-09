let types

Babel.transformSync('lol()', {
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
