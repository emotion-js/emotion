import jsx from '@babel/plugin-transform-react-jsx'
import pragmatic from 'babel-plugin-jsx-pragmatic'

let pragmaName = '___EmotionJSX'

export default ({ pragma, ...options }) => {
  return {
    plugins: [
      [
        pragmatic,
        {
          export: 'jsx',
          module: '@emotion/core',
          import: pragmaName
        }
      ],
      [jsx, { pragma: pragmaName, ...options }]
    ]
  }
}
