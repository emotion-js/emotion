// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import 'test-utils/next-env'
import 'test-utils/fake-css-variables-exist'
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

test('nested object with array', () => {
  let Theme = createTheme({
    color: 'green',
    spacing: ['4px', '8px', '12px', '16px'],
    fonts: {
      primary: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
      code: 'source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace'
    }
  })

  let Comp = Theme.consume((props, theme) => {
    return (
      <div
        css={{
          color: theme.color,
          padding: theme.spacing[1],
          fontFamily: theme.fonts.primary
        }}
        {...props}
      />
    )
  })

  expect(
    render(
      <Theme.Provider
        theme={{
          color: 'green',
          spacing: ['4px', '8px', '12px', '16px'],
          fonts: {
            primary: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif`,
            code: 'source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace'
          }
        }}
      >
        <Comp />
      </Theme.Provider>
    )
  ).toMatchInlineSnapshot(`
.emotion-0 {
  color: var(--theme--color);
  padding: var(--theme--spacing-1);
  font-family: var(--theme--fonts-primary);
}

<div
  style={
    Object {
      "--theme--color": "green",
      "--theme--fonts-code": "source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace",
      "--theme--fonts-primary": "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif",
      "--theme--spacing-0": "4px",
      "--theme--spacing-1": "8px",
      "--theme--spacing-2": "12px",
      "--theme--spacing-3": "16px",
    }
  }
>
  <div
    className="emotion-0"
  />
</div>
`)
})

test('Theme.consume passes ref', () => {})
