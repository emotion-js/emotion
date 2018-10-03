// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import 'test-utils/next-env'
import { createTheme } from '@emotion/theme'
import renderer from 'react-test-renderer'

function render(element) {
  return renderer.create(element).toJSON()
}

test('basics', () => {
  let Theme = createTheme({ color: 'green' })

  let SomeComp = Theme.consume((props, theme) => {
    return <div css={{ color: theme.color }} />
  })

  expect(render(<SomeComp />)).toMatchInlineSnapshot(`
.emotion-0 {
  color: green;
}

<div
  className="emotion-0"
/>
`)
  let OtherComp = props => (
    <Theme.Consumer>
      {theme => {
        return <div css={{ color: theme.color }} />
      }}
    </Theme.Consumer>
  )

  expect(render(<OtherComp />)).toMatchInlineSnapshot(`
.emotion-0 {
  color: green;
}

<div
  className="emotion-0"
/>
`)
})
