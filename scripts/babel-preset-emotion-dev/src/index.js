module.exports = () => {
  return {
    presets: [
      ['@babel/preset-env', { loose: true }],
      '@babel/preset-flow',
      '@babel/preset-react',
      ['@babel/preset-stage-2', { decoratorsLegacy: true }]
    ],
    plugins: ['babel-plugin-codegen']
  }
}
