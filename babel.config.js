const path = require('path')

let needsBabelPluginEmotion = filename =>
  filename.includes(path.join('.test.js'))

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
        plugins: ['babel-plugin-emotion']
      },
      {
        test: filename =>
          filename &&
          filename.includes('source-map') &&
          needsBabelPluginEmotion(filename),
        plugins: [['babel-plugin-emotion', { sourceMap: true }]]
      }
    ]
  }
}
