/** @jsx jsx
 * @jest-environment node
 */
// @flow
import { jsx } from '@emotion/core'
import { createTheme } from '@emotion/theme'
import { renderToString } from 'react-dom/server'
import HTMLSerializer from 'jest-serializer-html'

expect.addSnapshotSerializer(HTMLSerializer)

test('basics', () => {
  let Theme = createTheme({ color: 'green' })

  let SomeComp = Theme.consume((props, theme) => {
    return <div css={{ color: theme.color }} />
  })

  expect(renderToString(<SomeComp />)).toMatchInlineSnapshot(`

<style data-emotion-css="bjcoli">
  .css-bjcoli{color:green;}
</style>
<div class="css-bjcoli">
</div>

`)
  let OtherComp = props => (
    <Theme.Consumer>
      {theme => {
        return <div css={{ color: theme.color }} />
      }}
    </Theme.Consumer>
  )

  expect(renderToString(<OtherComp />)).toMatchInlineSnapshot(`

<style data-emotion-css="bjcoli">
  .css-bjcoli{color:green;}
</style>
<div class="css-bjcoli">
</div>

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
          padding: theme.spacing[4],
          fontFamily: theme.fonts.primary
        }}
        {...props}
      />
    )
  })

  expect(
    renderToString(
      <Theme.Provider
        supportsCSSVariables
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

<div data-theme-emotion="theme"
     style="--theme--color:green;--theme--spacing-0:4px;--theme--spacing-1:8px;--theme--spacing-2:12px;--theme--spacing-3:16px;--theme--fonts-primary:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;--theme--fonts-code:source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace"
>
  <style data-emotion-css="vnjq5y">
    .css-vnjq5y{color:var(--theme--color);font-family:var(--theme--fonts-primary);}
  </style>
  <div class="css-vnjq5y">
  </div>
</div>

`)
})
