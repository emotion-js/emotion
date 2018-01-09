import cssModules from './src/css-modules'
import emotion from './src/emotion'
import emotionCSS from './src/emotion-css'
import emotionObj from './src/emotion-obj'
import glamor from './src/glamor'
import glamorous from './src/glamorous'
import styledComponents from './src/styled-components'

import renderDeepTree from './tests/renderDeepTree'
import renderWideTree from './tests/renderWideTree'
import renderSierpinskiTriangle from './tests/renderSierpinskiTriangle'

const allTests = {
  emotion: [
    () => renderSierpinskiTriangle('emotion', emotion),
    () => renderDeepTree('emotion', emotion),
    () => renderWideTree('emotion', emotion),
  ],
  emotionCSS: [
    () => renderDeepTree('emotionCSS', emotionCSS),
    () => renderWideTree('emotionCSS', emotionCSS),
  ],
  emotionObj: [
    () => renderDeepTree('emotionObj', emotionObj),
    () => renderWideTree('emotionObj', emotionObj),
  ],
  glamor: [
    () => renderSierpinskiTriangle('glamor', glamor),
    () => renderDeepTree('glamor', glamor),
    () => renderWideTree('glamor', glamor),
  ],
  glamorous: [
    () => renderDeepTree('glamorous', glamorous),
    () => renderWideTree('glamorous', glamorous),
  ],
  'styled-components': [
    () => renderDeepTree('styled-components', styledComponents),
    () => renderWideTree('styled-components', styledComponents),
  ],
  'css-modules': [
    () => renderDeepTree('css-modules', cssModules),
    () => renderWideTree('css-modules', cssModules),
  ],
}

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
  tests.push(...allTests.emotion)
  tests.push(...allTests.emotionObj)
  tests.push(...allTests.emotionCSS)
  tests.push(...allTests['css-modules'])
  tests.push(...allTests.glamorous)
  tests.push(...allTests.glamor)
  tests.push(...allTests['styled-components'])
}

tests.push(() => () => Promise.resolve(console.log('done')))

tests.reduce((promise, test) => promise.then(test()), Promise.resolve())
