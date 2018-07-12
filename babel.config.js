module.exports = api => {
  api.cache(true)
  return {
    presets: ['babel-preset-emotion-dev'],
    plugins: ['babel-plugin-macros']
  }
}
