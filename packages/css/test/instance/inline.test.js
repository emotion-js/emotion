import {
  stripDataReactRoot,
  disableBrowserEnvTemporarily,
  safeQuerySelector
} from 'test-utils'
import {
  getComponents,
  getInjectedRules,
  createBigComponent,
  getCssFromChunks,
  setHtml
} from '../../../server/test/util'

let React
let renderToString
let render
let emotion
let emotionServer
let reactEmotion

const resetAllModules = () => {
  jest.resetModules()
  React = require('react')
  renderToString = require('react-dom/server').renderToString
  render = require('@testing-library/react/pure').render
  emotion = require('./emotion-instance')
  emotionServer = require('./emotion-instance')
  reactEmotion = require('./emotion-instance')
}

describe('renderStylesToString', () => {
  test('renders styles with ids', async () => {
    await disableBrowserEnvTemporarily(() => {
      resetAllModules()
      const { Page1, Page2 } = getComponents(emotion, reactEmotion)
      expect(
        emotionServer.renderStylesToString(renderToString(<Page1 />))
      ).toMatchSnapshot()
      expect(
        emotionServer.renderStylesToString(renderToString(<Page2 />))
      ).toMatchSnapshot()
    })
  })
  test.skip('renders large recursive component', async () => {
    await disableBrowserEnvTemporarily(() => {
      resetAllModules()
      const BigComponent = createBigComponent(emotion)
      expect(
        stripDataReactRoot(
          emotionServer.renderStylesToString(
            renderToString(<BigComponent count={200} />)
          )
        )
      ).toMatchSnapshot()
    })
  })
})
describe('hydration', () => {
  test('only inserts rules that are not in the critical css', async () => {
    const appHtml = await disableBrowserEnvTemporarily(() => {
      resetAllModules()

      const { Page1 } = getComponents(emotion, reactEmotion)
      return emotionServer.renderStylesToString(renderToString(<Page1 />))
    })

    expect(appHtml).toMatchSnapshot()
    document.body.innerHTML = `<div id="root">${appHtml}</div>`

    resetAllModules()

    expect(emotion.cache.registered).toEqual({})

    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    render(<NewPage1 />, {
      container: safeQuerySelector('#root')
    })
    expect(getInjectedRules()).toMatchSnapshot()
    expect(getCssFromChunks(emotion, document)).toMatchSnapshot()
  })
})
