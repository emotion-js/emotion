import benchmark from './benchmark'
import { flush as emotionFlush } from 'emotion'
import ReactDOM from 'react-dom'

const node = document.querySelector('.root')

const createRenderBenchmark = ({
  description,
  getElement,
  name,
  runs,
  flush
}) => () => {
  const setup = () => {}
  const teardown = () => {
    if (flush === true) emotionFlush()
    ReactDOM.unmountComponentAtNode(node)
  }

  return benchmark({
    name,
    description,
    runs,
    setup,
    teardown,
    task: () => {
      ReactDOM.render(getElement(), node)
    }
  })
}

export default createRenderBenchmark
