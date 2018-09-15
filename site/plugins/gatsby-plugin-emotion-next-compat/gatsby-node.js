exports.onCreateBabelConfig = ({ actions, stage }) => {
  actions.setBabelPreset({
    name: `@babel/preset-react`,
    stage,
    options: {
      useBuiltIns: true,
      pragma: `___EmotionJSX`,
      development: stage === `develop`
    }
  })
  actions.setBabelPlugin({
    name: 'babel-plugin-jsx-pragmatic',
    stage,
    options: {
      export: 'jsx',
      module: '@emotion/core',
      import: '___EmotionJSX'
    }
  })
  actions.setBabelPlugin({
    name: 'babel-plugin-emotion',
    stage,
    options: {
      jsx: true,
      sourceMap: stage === 'develop'
    }
  })
}
