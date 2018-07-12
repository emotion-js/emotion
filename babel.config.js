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
    filename.includes(`packages/${pkg}/test`)
  )

module.exports = api => {
  api.cache(true)
  return {
    presets: ['babel-preset-emotion-dev'],
    plugins: ['babel-plugin-macros'],
    overrides: [
      {
        test: filename =>
          !filename.includes('no-babel') && needsBabelPluginEmotion(filename),
        plugins: ['babel-plugin-emotion-test']
      },
      {
        test: filename =>
          filename.includes('auto-label') && needsBabelPluginEmotion(filename),
        plugins: [['babel-plugin-emotion-test', { autoLabel: true }]]
      },
      {
        test: filename =>
          filename.includes('extract') && needsBabelPluginEmotion(filename),
        plugins: [['babel-plugin-emotion-test', { extractStatic: true }]]
      },
      {
        test: filename =>
          filename.includes('source-map') && needsBabelPluginEmotion(filename),
        plugins: [['babel-plugin-emotion-test', { sourceMap: true }]]
      },
      {
        test: filename => filename.includes('babel-plugin-emotion/test/macro/'),
        plugins: ['babel-plugin-macros-register']
      }
    ]
  }
}
