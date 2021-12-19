/**
 * @jest-environment node
 */
import { stripDataReactRoot } from 'test-utils'
import {
  getComponents,
  getInjectedRules,
  createBigComponent,
  getCssFromChunks,
  setHtml
} from '../../../server/test/util'
import { JSDOM } from 'jsdom'

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
  beforeEach(resetAllModules)

  test('renders styles with ids', () => {
    const { Page1, Page2 } = getComponents(emotion, reactEmotion)
    expect(
      emotionServer.renderStylesToString(renderToString(<Page1 />))
    ).toMatchSnapshot()
    expect(
      emotionServer.renderStylesToString(renderToString(<Page2 />))
    ).toMatchSnapshot()
  })
  test('renders large recursive component', () => {
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
describe('hydration', () => {
  beforeEach(resetAllModules)

  afterEach(() => {
    global.document = undefined
    global.window = undefined
    global.navigator = undefined
  })

  test('only inserts rules that are not in the critical css', () => {
    const { Page1 } = getComponents(emotion, reactEmotion)
    const html = emotionServer.renderStylesToString(renderToString(<Page1 />))
    expect(html).toMatchSnapshot()
    const { window } = new JSDOM(html)
    global.document = window.document
    global.window = window
    global.navigator = window.navigator
    setHtml(html, document)

    resetAllModules()

    expect(emotion.cache.registered).toEqual({})

    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    render(<NewPage1 />)
    expect(getInjectedRules(document)).toMatchSnapshot()
    expect(getCssFromChunks(emotion, document)).toMatchSnapshot()
  })
})
