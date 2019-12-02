// @flow
import 'test-utils/prod-mode'
import * as React from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { render, unmountComponentAtNode } from 'react-dom'
import { Global, css } from '@emotion/core'

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`
})

test('basic', () => {
  render(
    <React.Fragment>
      <div css={{ color: 'hotpink' }} />
      <Global
        styles={css`
          h1 {
            color: hotpink;
          }
          @import url('https://some-url');
        `}
      />
    </React.Fragment>,
    // $FlowFixMe
    document.getElementById('root')
  )
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
  let elements = document.querySelectorAll('style')
  let rules = []
  for (let element of elements) {
    // $FlowFixMe
    for (let cssRule of element.sheet.cssRules) {
      rules.push(cssRule.cssText)
    }
  }
  expect(rules).toMatchInlineSnapshot(`
Array [
  "@import url(https://some-url);",
  "h1 {color: hotpink;}",
  ".css-1lrxbo5 {color: hotpink;}",
]
`)
  unmountComponentAtNode(document.getElementById('root'))
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
})
