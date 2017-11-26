const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const webpack = require('webpack')

module.exports = env => {
  const PROD = env === 'production'

  var loaders = [
    {
      test: /\.jsx?$/,
      include: [
        /src/,
        /autoprefixer/,
        /chalk/,
        /ansi-styles/,
        /postcss-nested/,
        /caniuse-lite/
      ],
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      use: PROD
        ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true
              }
            }
          })
        : ['style-loader', { loader: 'css-loader' }]
    },
    {
      test: /\.(jpg|png|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 25000
      }
    },
    {
      loader: 'raw-loader',
      test: /\.(example|md)$/
    }
  ]

  return {
    devtool: 'source-map',
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
        favicon: './favicon.ico',
        filename: 'index.html',
        inject: false
      })
    ].concat(
      PROD
        ? [
            new ExtractTextPlugin('styles.css'),
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new UglifyPlugin({
              extractComments: true,
              parallel: true,
              sourceMap: true
            })
          ]
        : []
    ),
    module: {
      loaders: loaders
    },
    node: {
      fs: 'empty'
    }
  }
}
