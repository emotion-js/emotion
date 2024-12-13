import { disableBrowserEnvTemporarily, safeQuerySelector } from 'test-utils'

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
  emotion = require('@emotion/css')
  emotionServer = require('@emotion/server')
  reactEmotion = require('@emotion/styled')
  util = require('./util')
}

describe('renderStylesToString', () => {
  test('renders styles with ids', async () => {
    await disableBrowserEnvTemporarily(() => {
      resetAllModules()
      const { Page1, Page2 } = util.getComponents(emotion, reactEmotion)
      expect(
        emotionServer.renderStylesToString(renderToString(<Page1 />))
      ).toMatchSnapshot()
      expect(
        emotionServer.renderStylesToString(renderToString(<Page2 />))
      ).toMatchSnapshot()
    })
  })
  test('skip undefined styles', async () => {
    await disableBrowserEnvTemporarily(() => {
      resetAllModules()
      const { css } = emotion
      const style = css`
        color: red;
      `
      const component = (
        <a href={`${emotion.cache.key}-fail`} className={style} />
      )
      const output = emotionServer.renderStylesToString(
        renderToString(component)
      )

      expect(output).toEqual(expect.not.stringContaining('undefined'))
      expect(output).toMatchSnapshot()
    })
  })

  // blocked on https://github.com/facebook/react/issues/31754
  test.skip('renders large recursive component', async () => {
    await disableBrowserEnvTemporarily(() => {
      resetAllModules()
      const BigComponent = util.createBigComponent(emotion)
      expect(
        emotionServer.renderStylesToString(
          renderToString(<BigComponent count={200} />)
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
      return emotionServer.renderStylesToString(renderToString(<Page1 />))
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
