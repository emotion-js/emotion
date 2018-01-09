import React from 'react'
import ReactDOM from 'react-dom'
import SierpinskiTriangle from '../src/components/SierpinskiTriangle'
import { fmt, standardDeviation, mean, median } from '../benchmark'

const node = document.querySelector('.root')

let runs = 20

class Speedometer extends React.Component {
  state = { renderCount: -1 }

  async componentDidMount() {
    const durations = []
    while (runs--) {
      const then = window.performance.now()
      await new Promise(resolve => {
        this.raf = window.requestAnimationFrame(() => {
          this.setState({ renderCount: this.state.renderCount + 1 }, () => {
            const now = window.performance.now()
            durations.push(now - then)
            resolve()
          })
        })
      })
    }
    runs = 20
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
      durations,
    })
    this.props.onComplete()
  }
  componentWillUnmount() {
    window.cancelAnimationFrame(this.raf)
  }
  render() {
    return (
      <this.props.Wrapper>
        <SierpinskiTriangle
          x={0}
          y={0}
          s={1000}
          Dot={this.props.Dot}
          renderCount={this.state.renderCount}
        />
      </this.props.Wrapper>
    )
  }
}

const renderSierpinskiTriangle = (name, { Dot, Wrapper }) => () => {
  return new Promise(resolve => {
    ReactDOM.render(
      <Speedometer
        Dot={Dot}
        Wrapper={Wrapper}
        onComplete={() => {
          ReactDOM.unmountComponentAtNode(node)
          resolve()
        }}
        name={`Triangle [${name}]`}
        description="push dynamic styles"
      />,
      node
    )
  })
}

export default renderSierpinskiTriangle
