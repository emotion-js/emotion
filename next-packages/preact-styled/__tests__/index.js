// @flow
/** @jsx h */
import 'test-utils/preact-mode'
import 'test-utils/dev-mode'
import { throwIfFalsy } from 'test-utils'
import { h, render as preactRender } from 'preact'
import styled from '@emotion/preact-styled'

function render(element, callback) {
  throwIfFalsy(document.body).innerHTML = `<div id="root"></div>`
  preactRender(element, throwIfFalsy(document.getElementById('root')))
  callback()
  throwIfFalsy(document.body).innerHTML = `<div id="root"></div>`
}

test('innerRef', () => {
  const H1 = styled.h1`
    font-size: 12px;
  `
  let node
  render(
    <H1
      innerRef={val => {
        node = val
      }}
      id="thing"
    >
      hello world
    </H1>,
    () => {
      expect(node).toBe(document.getElementById('thing'))
    }
  )
})
