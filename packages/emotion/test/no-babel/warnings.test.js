// @flow
import 'test-utils/legacy-env'
import { css } from 'emotion'

// $FlowFixMe
console.error = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})

it('warns about illegal escape sequences inside first quasi of template literal', () => {
  css`
    :before {
      content: '\00d7';
    }
  `

  expect((console.error: any).mock.calls[0]).toMatchInlineSnapshot(`
        Array [
          "You have illegal escape sequence in your template literal, most likely inside content's property value.
        Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \\"content: '\\\\00d7';\\" should become \\"content: '\\\\\\\\00d7';\\".
        You can read more about this here:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
        ]
    `)
})

it('warns about illegal escape sequences inside non-first quasi of template literal', () => {
  const color = `color: hotpink`
  css`
    background-color: black;
    ${color};
    :before {
      content: '\00d7';
    }
  `

  expect((console.error: any).mock.calls[0]).toMatchInlineSnapshot(`
    Array [
      "You have illegal escape sequence in your template literal, most likely inside content's property value.
    Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \\"content: '\\\\00d7';\\" should become \\"content: '\\\\\\\\00d7';\\".
    You can read more about this here:
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
    ]
  `)
})
