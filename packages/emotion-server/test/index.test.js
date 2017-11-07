/**
 * @jest-environment node
*/
import React from 'react'
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion-server'
import { getComponents, prettyifyCritical } from './util'
import { hydrate, sheet, flush } from 'emotion'

describe('extractCritical', () => {
  test('returns static css', () => {
    const { Page1, Page2 } = getComponents()
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
    const { Page1 } = getComponents()
    const { html, ids, css } = extractCritical(renderToString(<Page1 />))
    expect(prettyifyCritical({ html, css, ids })).toMatchSnapshot()
    flush()
    hydrate(ids)
    const { Page1: NewPage1 } = getComponents()
    renderToString(<NewPage1 />)
    expect(sheet.sheet).toMatchSnapshot()
  })
})
