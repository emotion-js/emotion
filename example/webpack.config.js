const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = env => {
  const PROD = env === 'production'

  var loaders = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader', options: { sourceMap: true } }
      ]
    }
  ]

  return {
    devtool: PROD ? 'source-map' : 'eval',
    entry: path.resolve('src', 'main.js'),
    output: {
      path: path.resolve('build'),
      filename: 'main.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      mainFields: ['browser', 'main'],
      alias: {
        'emotion/styled': 'emotion/lib/styled',
        'buble/dist/buble.deps': path.resolve('src', 'transform.js')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('src', 'index.tpl.html'),
        favicon: './favicon.ico',
        filename: 'index.html',
        inject: false
      })
    ].concat(PROD ? new ExtractTextPlugin('styles.css') : []),
    module: {
      loaders: loaders
    },
    node: {
      fs: 'empty'
    }
  }
}
