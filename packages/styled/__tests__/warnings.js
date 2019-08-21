// @flow
import 'test-utils/legacy-env'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

// $FlowFixMe
console.error = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

it('warns about illegal escape sequances inside first quasi of template literal', () => {
  styled.div`
    :before {
      content: '\00d7';
    }
  `

  expect(console.error.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      "You have illegal escape sequance in your template literal, most likely inside content's property value.
    Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \\"content: '\\\\00d7';\\" should become \\"content: '\\\\\\\\00d7';\\".
    You can read more about this here:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
    ]
  `)
})

it('warns about illegal escape sequances inside non-first quasi of template literal', () => {
  const color = css`
    color: hotpink;
  `
  styled.div`
    background-color: black;
    ${color};
    :before {
      content: '\00d7';
    }
  `

  expect(console.error.mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      "You have illegal escape sequance in your template literal, most likely inside content's property value.
    Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \\"content: '\\\\00d7';\\" should become \\"content: '\\\\\\\\00d7';\\".
    You can read more about this here:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
    ]
  `)
})
