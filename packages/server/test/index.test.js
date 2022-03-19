import { getComponents, prettifyCritical, getInjectedRules } from './util'
import {
  ignoreConsoleErrors,
  disableBrowserEnvTemporarily,
  safeQuerySelector
} from 'test-utils'

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
  emotion = require('@emotion/css')
  emotionServer = require('@emotion/server')
  reactEmotion = require('@emotion/styled')
}

describe('extractCritical', () => {
  test('returns static css', async () => {
    await disableBrowserEnvTemporarily(() => {
      resetAllModules()
      const { Page1, Page2 } = getComponents(emotion, reactEmotion)
      expect(
        prettifyCritical(
          emotionServer.extractCritical(renderToString(<Page1 />))
        )
      ).toMatchSnapshot()
      expect(
        prettifyCritical(
          emotionServer.extractCritical(renderToString(<Page2 />))
        )
      ).toMatchSnapshot()
    })
  })

  test('does not warn when using extract critical', async () => {
    await disableBrowserEnvTemporarily(() => {
      resetAllModules()
      let Provider = require('@emotion/react').CacheProvider
      const WithNthSelector = reactEmotion.default('div')({
        ':nth-child(1)': {}
      })

      ignoreConsoleErrors(() => {
        emotionServer.extractCritical(
          renderToString(
            <Provider value={emotion.cache}>
              <WithNthSelector />
            </Provider>
          )
        )

        expect(console.error.mock.calls).toMatchObject([])
      })
    })
  })
})

describe('hydration', () => {
  test('only rules that are not in the critical css are inserted', async () => {
    const { html, ids, css } = await disableBrowserEnvTemporarily(() => {
      resetAllModules()
      const { Page1 } = getComponents(emotion, reactEmotion)
      return emotionServer.extractCritical(renderToString(<Page1 />))
    })

    expect(prettifyCritical({ html, css, ids })).toMatchSnapshot()
    document.body.innerHTML = `<div id="root">${html}</div>`

    resetAllModules()
    emotion = require('@emotion/css')
    emotionServer = require('@emotion/server')

    expect(emotion.cache.inserted).toEqual({})
    emotion.hydrate(ids)
    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    render(<NewPage1 />, {
      container: safeQuerySelector('#root')
    })
    expect(getInjectedRules()).toMatchSnapshot()
  })
})
