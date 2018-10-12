const path = require('path')

let pkgsThatNeedBabelPluginEmotion = [
  'emotion',
  'create-emotion',
  'react-emotion',
  'jest-emotion',
  'emotion-server',
  'create-emotion-server',
  'emotion-theming'
]

let needsBabelPluginEmotion = filename =>
  pkgsThatNeedBabelPluginEmotion.some(pkg =>
    filename.includes(path.join('packages', pkg, 'test'))
  )

module.exports = api => {
  api.cache(true)
  return {
    presets: ['babel-preset-emotion-dev'],
    overrides: [
      {
        test: filename =>
          !filename.includes('no-babel') && needsBabelPluginEmotion(filename),
        plugins: ['babel-plugin-emotion-test']
      },
      {
        test: filename =>
          filename.includes('source-map') && needsBabelPluginEmotion(filename),
        plugins: [['babel-plugin-emotion-test', { sourceMap: true }]]
      }
    ]
  }
}
