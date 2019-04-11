module.exports = () => {
  return {
    presets: [
      ['@babel/preset-env', { loose: true }],
      '@babel/preset-flow',
      '@babel/preset-react'
    ],
    plugins: [
      'babel-plugin-codegen',
      '@babel/plugin-transform-runtime',
      ['@babel/plugin-proposal-class-properties', { loose: false }]
    ]
  }
}
