// import aphrodite from './src/aphrodite'
import cssModules from './src/css-modules'
import emotion from './src/emotion'
import emotionCSS from './src/emotion-css'
import emotionObjStyle from './src/emotion-obj-style'
import glamor from './src/glamor'
import glamorous from './src/glamorous'
import newCssInJs from './src/new-css-in-js'
// import jss from './src/jss'
// import radium from './src/radium'
// import reactNative from './src/react-native'
// import reactNativeStyleSheet from './src/react-native-stylesheet'
import styledComponents from './src/styled-components'
// import styledComponentsPrimitives from './src/styled-components-primitives'
// import styletron from './src/styletron'
// import xp from './src/reactxp'

import renderDeepTree from './tests/renderDeepTree'
// import renderTweet from './tests/renderTweet'
import renderWideTree from './tests/renderWideTree'

const allTests = {
  emotion: [
    () => renderDeepTree('emotion', emotion),
    () => renderWideTree('emotion', emotion)
  ],
  emotionCSS: [
    () => renderDeepTree('emotionCSS', emotionCSS),
    () => renderWideTree('emotionCSS', emotionCSS)
  ],
  emotionObjStyle: [
    () => renderDeepTree('emotionObjStyle', emotionObjStyle),
    () => renderWideTree('emotionObjStyle', emotionObjStyle)
  ],
  glamor: [
    () => renderDeepTree('glamor', glamor),
    () => renderWideTree('glamor', glamor)
  ],
  glamorous: [
    () => renderDeepTree('glamorous', glamorous),
    () => renderWideTree('glamorous', glamorous)
  ],
  'styled-components': [
    () => renderDeepTree('styled-components', styledComponents),
    () => renderWideTree('styled-components', styledComponents)
  ],
  'new-css-in-js': [
    () => renderDeepTree('new-css-in-js', newCssInJs),
    () => renderWideTree('new-css-in-js', newCssInJs)
  ],
  'css-modules': [
    () => renderDeepTree('css-modules', cssModules),
    () => renderWideTree('css-modules', cssModules)
  ]
}

// const coreTests = [
// () => renderTweet('emotion', emotion),
// () => renderDeepTree('emotionCSS', emotionCSS),
// () => renderWideTree('emotionCSS', emotionCSS),
// () => renderDeepTree('emotionObjStyle', emotionObjStyle),
// () => renderWideTree('emotionObjStyle', emotionObjStyle),
// () => renderTweet('react-native-web', reactNative),
// () => renderDeepTree('css-modules', cssModules),
// () => renderWideTree('css-modules', cssModules),
// () => renderTweet('react-native-web/stylesheet', reactNativeStyleSheet),
// () => renderDeepTree('react-native-web/stylesheet', reactNativeStyleSheet),
// () => renderWideTree('react-native-web/stylesheet', reactNativeStyleSheet),
// () => renderDeepTree('react-native-web', reactNative),
// () => renderWideTree('react-native-web', reactNative)
// () => renderTweet('glamor', glamor),
// () => renderTweet('glamorous', glamorous),
// () => renderTweet('styled-components', styledComponents),
// ]

const tests = []

if (window.location.hash) {
  window.location.hash
    .slice(1)
    .split(',')
    .forEach(test => {
      if (Array.isArray(allTests[test])) {
        tests.push(...allTests[test])
      } else {
        throw new Error(`Benchmark for ${test} not found`)
      }
    })
} else {
  tests.push(...allTests['new-css-in-js'])
  tests.push(...allTests.emotion)
  tests.push(...allTests['css-modules'])
  tests.push(...allTests.glamorous)
  tests.push(...allTests['styled-components'])
}

tests.push(() => () => Promise.resolve(console.log('done')))

tests.reduce((promise, test) => promise.then(test()), Promise.resolve())
