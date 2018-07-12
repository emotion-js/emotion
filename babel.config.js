let packagesThatRequireBabelPluginEmotionForTests = [
  'emotion',
  'create-emotion',
  'create-emotion-server',
  'create-emotion-styled',
  'react-emotion',
  'preact-emotion',
  'emotion-server'
]

module.exports = api => {
  api.cache(true)
  return {
    presets: [
      ['@babel/preset-env', { loose: true }],
      '@babel/preset-flow',
      '@babel/preset-react',
      ['@babel/preset-stage-2', { decoratorsLegacy: true }]
    ],
    plugins: ['babel-plugin-codegen'],
    overrides: [
      {
        test: filename => {
          return (
            filename.includes('test') &&
            !filename.includes('no-babel') &&
            packagesThatRequireBabelPluginEmotionForTests.some(pkg =>
              filename.includes(`packages/${pkg}/`)
            )
          )
        },
        plugins: ['babel-plugin-emotion-test']
      }
    ]
  }
}
