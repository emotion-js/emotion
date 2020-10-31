const path = require('path')
const emotionDevPreset = require('babel-preset-emotion-dev')

let needsBabelPluginEmotion = filename => /\.test\.js$/.test(filename)

let isTestFile = filename =>
  /\.test\.js$/.test(filename) ||
  filename.includes(`${path.sep}__tests__${path.sep}`)

module.exports = api => {
  api.cache(true)
  return {
    presets: ['babel-preset-emotion-dev'],
    overrides: [
      {
        test: filename =>
          filename &&
          ((!filename.includes('no-babel') &&
            needsBabelPluginEmotion(filename)) ||
            filename.includes(path.join('__tests__', 'babel'))),
        presets: [[emotionDevPreset, { useEmotionPlugin: true }]]
      },
      {
        test: filename =>
          filename &&
          filename.includes('source-map') &&
          needsBabelPluginEmotion(filename),
        presets: [
          [emotionDevPreset, { useEmotionPlugin: true, sourceMap: true }]
        ]
      },
      {
        test: filename =>
          filename &&
          isTestFile(filename) &&
          filename.includes('automatic-runtime'),
        presets: [[emotionDevPreset, { runtime: 'automatic' }]]
      },
      {
        test: filename =>
          filename &&
          isTestFile(filename) &&
          filename.includes('automatic-dev-runtime'),
        presets: [
          [emotionDevPreset, { runtime: 'automatic', development: true }]
        ]
      }
    ]
  }
}
