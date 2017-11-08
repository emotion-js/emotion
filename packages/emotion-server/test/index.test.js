/**
 * @jest-environment node
*/
import React from 'react'
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion-server'
import { getComponents, prettyifyCritical } from './util'

let emotion = require('emotion')
let reactEmotion = require('react-emotion')

describe('extractCritical', () => {
  test('returns static css', () => {
    const { Page1, Page2 } = getComponents(emotion, reactEmotion)
    expect(
      prettyifyCritical(extractCritical(renderToString(<Page1 />)))
    ).toMatchSnapshot()
    expect(
      prettyifyCritical(extractCritical(renderToString(<Page2 />)))
    ).toMatchSnapshot()
  })
})
describe('hydration', () => {
  test('only rules that are not in the critical css are inserted', () => {
    const { Page1 } = getComponents(emotion, reactEmotion)
    const { html, ids, css } = extractCritical(renderToString(<Page1 />))
    expect(prettyifyCritical({ html, css, ids })).toMatchSnapshot()
    jest.resetModules()
    emotion = require('emotion')
    expect(emotion.inserted).toEqual({})
    emotion.hydrate(ids)
    const { Page1: NewPage1 } = getComponents(emotion, reactEmotion)
    renderToString(<NewPage1 />)
    expect(emotion.sheet.sheet).toMatchSnapshot()
  })
})
