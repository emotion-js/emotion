const path = require('path')

const publicPath = path.join(__dirname, 'public')

module.exports = {
  entry: './src/index',
  output: {
    filename: 'bundle.js',
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: publicPath
  }
}
