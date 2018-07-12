// @flow
import 'test-utils/dev-mode'
import * as React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { Global } from '@emotion/core'

beforeEach(() => {
  // $FlowFixMe
  document.head.innerHTML = ''
  // $FlowFixMe
  document.body.innerHTML = `<div id="root"></div>`
})

test('basic', () => {
  render(
    <Global
      styles={{
        html: {
          backgroundColor: 'hotpink'
        }
      }}
    />,
    // $FlowFixMe
    document.getElementById('root')
  )
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
  unmountComponentAtNode(document.getElementById('root'))
  expect(document.head).toMatchSnapshot()
  expect(document.body).toMatchSnapshot()
})
