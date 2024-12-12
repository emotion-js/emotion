import 'test-utils/setup-env'
import React from 'react'
import { render } from '@testing-library/react'
import styled from '@emotion/styled'
import { css, ThemeProvider } from '@emotion/react'

test('theme with react-test-renderer', () => {
  const Div = styled.div`
    color: ${props => props.theme.primary};
  `
  const { container } = render(
    <ThemeProvider theme={{ primary: 'pink' }}>
      <Div>this will be pink</Div>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('themes', () => {
  const theme = { white: '#f8f9fa', purple: '#8c81d8', gold: '#ffd43b' }

  const fontSize = '20px'

  const cssA = css`
    color: blue;
  `

  const cssB = css`
    ${cssA};
    height: 64px;
  `

  const Heading = styled('span')`
    background-color: ${p => p.theme.gold};
  `

  const H1 = styled(Heading)`
    ${cssB};
    font-size: ${fontSize};
    color: ${p => p.theme.purple};
  `

  const H2 = styled(H1)`
    font-size: 32px;
  `

  const { container } = render(
    <ThemeProvider theme={theme}>
      <H2>hello world</H2>
    </ThemeProvider>
  )

  expect(container.firstChild).toMatchSnapshot()
})

test('theme prop exists without ThemeProvider', () => {
  const SomeComponent = styled.div`
    color: ${props => props.theme.color || 'green'};
    background-color: yellow;
  `
  const { container } = render(<SomeComponent />)
  expect(container.firstChild).toMatchSnapshot()
})
test('theme prop exists without ThemeProvider with a theme prop on the component', () => {
  const SomeComponent = styled.div`
    color: ${props => props.theme.color || 'green'};
    background-color: yellow;
  `
  const { container } = render(<SomeComponent theme={{ color: 'hotpink' }} />)
  expect(container.firstChild).toMatchSnapshot()
})
