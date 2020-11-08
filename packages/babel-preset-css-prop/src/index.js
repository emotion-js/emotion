import jsx from '@babel/plugin-transform-react-jsx'
import jsxDev from '@babel/plugin-transform-react-jsx-development'
import pragmatic from '@emotion/babel-plugin-jsx-pragmatic'
import emotion from '@emotion/babel-plugin'

let pragmaName = '___EmotionJSX'

// pull out the emotion options and pass everything else to the jsx transformer
// this means if @babel/plugin-transform-react-jsx adds more options, it'll just work
// and if @emotion/babel-plugin adds more options we can add them since this lives in
// the same repo as @emotion/babel-plugin

export default (
  api,
  {
    pragma,
    sourceMap,
    autoLabel,
    labelFormat,
    importMap,
    development = false,
    ...options
  } = {}
) => {
  if (options.runtime) {
    console.warn(
      '`runtime` option has been deprecated. It still works and will continue to work in Emotion 10 but we have found out that including JSX plugin twice in the Babel configuration leads to hard to debug problems and it\'s not always obvious that some presets include it. If you want to configure `runtime: "automatic"` just replace `@emotion/babel-preset-css-prop` with `@babel/preset-react` and `@emotion/babel-plugin`. You can find out how to configure things properly here: https://emotion.sh/docs/css-prop#babel-preset'
    )
  }

  return {
    plugins: [
      options.runtime !== 'automatic' && [
        pragmatic,
        {
          export: 'jsx',
          module: '@emotion/react',
          import: pragmaName
        }
      ],
      [
        development ? jsxDev : jsx,
        {
          ...(options.runtime === 'automatic'
            ? { importSource: '@emotion/react' }
            : { pragma: pragmaName, pragmaFrag: 'React.Fragment' }),
          ...options
        }
      ],
      [
        emotion,
        {
          sourceMap,
          autoLabel,
          labelFormat,
          cssPropOptimization: true,
          importMap
        }
      ]
    ].filter(Boolean)
  }
}
