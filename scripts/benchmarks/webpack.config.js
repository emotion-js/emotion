const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const path = require('path')

const appDirectory = path.resolve(__dirname)

module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './src/index',
  output: {
    path: path.resolve(appDirectory, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(appDirectory, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: [
              ['babel-preset-env', { modules: false, loose: true }],
              'babel-preset-react',
              'babel-preset-stage-2'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    })
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
}
