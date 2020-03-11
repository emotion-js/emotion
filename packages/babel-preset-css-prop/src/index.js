import jsx from '@babel/plugin-transform-react-jsx'
import { autoImportEmotionJSXIFNeed } from './auto-import-emotion-jsx-if-need'
import emotion from 'babel-plugin-emotion'

// pull out the emotion options and pass everything else to the jsx transformer
// this means if @babel/plugin-transform-react-jsx adds more options, it'll just work
// and if babel-plugin-emotion adds more options we can add them since this lives in
// the same repo as babel-plugin-emotion
export default (
  api,
  {
    pragma,
    cssPropOnly,
    sourceMap,
    autoLabel,
    labelFormat,
    instances,
    ...options
  } = {}
) => {
  return {
    plugins: [
      [
        autoImportEmotionJSXIFNeed,
        {
          cssPropOnly
        }
      ],
      jsx, // to handle @jsx & @jsxFrag modified by autoImportEmotionJSXIFNeed
      [
        emotion,
        {
          sourceMap,
          autoLabel,
          labelFormat,
          instances,
          cssPropOptimization: true
        }
      ]
    ]
  }
}
