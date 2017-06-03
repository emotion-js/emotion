var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
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
      use: PROD
        ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
        : ['glam/loader']
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
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve('src', 'index.tpl.html'),
        filename: 'index.html',
        inject: false
      })
    ].concat(PROD ? new ExtractTextPlugin('styles.css') : []),
    module: {
      loaders: loaders
    },
    node: {
      fs: "empty"
    }
  }
}
