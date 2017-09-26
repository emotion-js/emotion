const path = require('path')

exports.modifyBabelrc = ({ babelrc }) => {
  if (process.env.NODE_ENV !== 'production') {
    return {
      plugins: [[`babel-plugin-emotion`, { sourceMap: true }]].concat(
        babelrc.plugins
      )
    }
  }
  return {
    plugins: [`babel-plugin-emotion`].concat(babelrc.plugins)
  }
}
exports.modifyWebpackConfig = ({ config }) => {
  config.merge({
    resolve: {
      alias: {
        'buble/dist/buble.deps': path.join(__dirname, './src/utils/transform')
      }
    },
    node: {
      fs: 'empty'
    }
  })
}

exports.createPages = () =>
  new Promise((resolve, reject) => {
    resolve()
  })
