import React from 'react'
import ReactDOM from 'react-dom'
// import { css } from 'emotion'
import styled from 'react-emotion/macro'

import { fmt, standardDeviation, mean, median } from './benchmark'

// import cssModules from './src/css-modules'
// import emotion from './src/emotion'
// import emotionCSS from './src/emotion-css'
// import emotionObj from './src/emotion-obj'
// import glamor from './src/glamor'
// import glamorous from './src/glamorous'
// import styledComponents from './src/styled-components'
//
// import renderDeepTree from './tests/renderDeepTree'
// import renderWideTree from './tests/renderWideTree'
import SierpinskiTriangle from './tests/renderSierpinskiTriangle'

const runs = Array.from({ length: 20 }, (x, i) => i)

const Wrapper = styled('div')`
  position: absolute;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 10px;
  background: #eee;
  transform: scale(0.33);
`

class Speedometer extends React.Component {
  state = { renderCount: -1 }

  async componentDidMount() {
    const durations = []
    for (let index of runs) {
      const then = window.performance.now()
      await new Promise(resolve => {
        window.requestAnimationFrame(() => {
          this.setState({ renderCount: this.state.renderCount + 1 }, () => {
            const now = window.performance.now()
            durations.push(now - then)
            resolve()
          })
        })
      })
    }

    const stdDev = standardDeviation(durations)
    const formattedMean = fmt(mean(durations))
    const formattedMedian = fmt(median(durations))
    const formattedStdDev = fmt(stdDev)

    console.log({
      name: this.props.name,
      description: this.props.description,
      mean: formattedMean,
      median: formattedMedian,
      stdDev: formattedStdDev,
      durations
    })
    console.log('done')
  }

  render() {
    return (
      <Wrapper>
        <SierpinskiTriangle
          x={0}
          y={0}
          s={1000}
          renderCount={this.state.renderCount}
        />
      </Wrapper>
    )
  }
}

const node = document.querySelector('.root')
ReactDOM.render(
  <Speedometer name="triangle" description="push dynamic styles" />,
  node
)

// const allTests = {
//   emotion: [
//     () => renderSierpinskiTriangle('emotion', emotion)
//     // () => renderDeepTree('emotion', emotion),
//     // () => renderWideTree('emotion', emotion)
//   ]
//   // emotionCSS: [
//   //   () => renderDeepTree('emotionCSS', emotionCSS),
//   //   () => renderWideTree('emotionCSS', emotionCSS)
//   // ],
//   // emotionObj: [
//   //   () => renderDeepTree('emotionObj', emotionObj),
//   //   () => renderWideTree('emotionObj', emotionObj)
//   // ],
//   // glamor: [
//   //   () => renderDeepTree('glamor', glamor),
//   //   () => renderWideTree('glamor', glamor)
//   // ],
//   // glamorous: [
//   //   () => renderDeepTree('glamorous', glamorous),
//   //   () => renderWideTree('glamorous', glamorous)
//   // ],
//   // 'styled-components': [
//   //   () => renderDeepTree('styled-components', styledComponents),
//   //   () => renderWideTree('styled-components', styledComponents)
//   // ],
//   // 'css-modules': [
//   //   () => renderDeepTree('css-modules', cssModules),
//   //   () => renderWideTree('css-modules', cssModules)
//   // ]
// }
//
// const tests = []
//
// if (window.location.hash) {
//   window.location.hash
//     .slice(1)
//     .split(',')
//     .forEach(test => {
//       if (Array.isArray(allTests[test])) {
//         tests.push(...allTests[test])
//       } else {
//         throw new Error(`Benchmark for ${test} not found`)
//       }
//     })
// } else {
//   tests.push(...allTests.emotion)
//   // tests.push(...allTests.emotionObj)
//   // tests.push(...allTests.emotionCSS)
//   // tests.push(...allTests['css-modules'])
//   // tests.push(...allTests.glamorous)
//   // tests.push(...allTests.glamor)
//   // tests.push(...allTests['styled-components'])
// }
//
// tests.push(() => () => Promise.resolve(console.log('done')))
//
// tests.reduce((promise, test) => promise.then(test()), Promise.resolve())
