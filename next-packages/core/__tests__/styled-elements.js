// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import { jsx } from '@emotion/core'
import { StyledElementsProvider } from '@emotion/core/src/styled-element-context'
import ThemeProvider from '@emotion/provider'
import renderer from 'react-test-renderer'

test('Styled Elements - basic element', () => {
  const tree = renderer.create(
    <StyledElementsProvider
      components={{ div: { display: 'flex', color: 'hotpink' } }}
    >
      <div />
    </StyledElementsProvider>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('Styled Elements - nested elements', () => {
  const tree = renderer.create(
    <StyledElementsProvider
      components={{
        div: { display: 'flex', color: 'hotpink' },
        h1: { fontSize: 18 },
        button: { outline: 'none', border: 'none', backgroundColor: 'purple' }
      }}
    >
      <div>
        <h1>Hello</h1>
        <button>Click Me</button>
      </div>
    </StyledElementsProvider>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('Styled Elements - css', () => {
  const tree = renderer.create(
    <StyledElementsProvider
      components={{ div: { display: 'flex', color: 'hotpink' } }}
    >
      <div css={{ color: 'green' }} />
    </StyledElementsProvider>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('Styled Elements - prop function', () => {
  const tree = renderer.create(
    <StyledElementsProvider
      components={{ div: ({ fontSize }) => ({ fontSize: fontSize || 8 }) }}
    >
      <div fontSize={24} />
    </StyledElementsProvider>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('Styled Elements - theming', () => {
  const tree = renderer.create(
    <StyledElementsProvider components={{ div: { color: 'hotpink' } }}>
      <ThemeProvider theme={{ primary: 'green' }}>
        <div css={theme => ({ color: theme.primary })} />
      </ThemeProvider>
    </StyledElementsProvider>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})

test('Styled Elements - prop function with theming', () => {
  const tree = renderer.create(
    <StyledElementsProvider
      components={{ div: ({ theme }) => ({ color: theme.color }) }}
    >
      <ThemeProvider theme={{ primary: 'green' }}>
        <div />
      </ThemeProvider>
    </StyledElementsProvider>
  )

  expect(tree.toJSON()).toMatchSnapshot()
})
