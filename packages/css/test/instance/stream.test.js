import {
  stripDataReactRoot,
  disableBrowserEnvTemporarily,
  safeQuerySelector
} from 'test-utils'

let React
let renderToString
let render
let emotion
let emotionServer
let reactEmotion
let util

const resetAllModules = () => {
  jest.resetModules()
  React = require('react')
  renderToString = require('react-dom/server').renderToString
  render = require('@testing-library/react/pure').render
  emotion = require('./emotion-instance')
  emotionServer = require('./emotion-instance')
  reactEmotion = require('./emotion-instance')
  util = require('../../../server/test/util')
}

describe('renderStylesToNodeStream', () => {
  test('renders styles with ids', async () => {
    await disableBrowserEnvTemporarily(async () => {
      resetAllModules()
      const { Page1, Page2 } = util.getComponents(emotion, reactEmotion)
      expect(
        await util.renderToStringWithStream(<Page1 />, emotionServer)
      ).toMatchSnapshot()
      expect(
        await util.renderToStringWithStream(<Page2 />, emotionServer)
      ).toMatchSnapshot()
    })
  })
  test('renders large recursive component', async () => {
    await disableBrowserEnvTemporarily(async () => {
      resetAllModules()
      const BigComponent = util.createBigComponent(emotion)
      expect(
        stripDataReactRoot(
          await util.renderToStringWithStream(
            <BigComponent count={200} />,
            emotionServer
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
      const { Page1 } = util.getComponents(emotion, reactEmotion)
      return util.renderToStringWithStream(<Page1 />, emotionServer)
    })

    expect(appHtml).toMatchSnapshot()
    document.body.innerHTML = `<div id="root">${appHtml}</div>`

    resetAllModules()

    expect(emotion.cache.registered).toEqual({})

    const { Page1: NewPage1 } = util.getComponents(emotion, reactEmotion)
    render(<NewPage1 />, {
      container: safeQuerySelector('#root')
    })
    expect(util.getInjectedRules(document)).toMatchSnapshot()
    expect(util.getCssFromChunks(emotion, document)).toMatchSnapshot()
  })
})
