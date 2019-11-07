// @flow
import 'test-utils/legacy-env'
import React from 'react'
import * as renderer from 'react-test-renderer'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'

test('theme with react-test-renderer', () => {
  const Div = styled.div`
    color: ${props => props.theme.primary};
  `
  const tree = renderer
    .create(
      <ThemeProvider theme={{ primary: 'pink' }}>
        <Div>this will be pink</Div>
      </ThemeProvider>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
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

  const tree = renderer
    .create(
      <ThemeProvider theme={theme}>
        <H2>hello world</H2>
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test('theme prop exists without ThemeProvider', () => {
  const SomeComponent = styled.div`
    color: ${props => props.theme.color || 'green'};
    background-color: yellow;
  `
  const tree = renderer.create(<SomeComponent />).toJSON()
  expect(tree).toMatchSnapshot()
})
test('theme prop exists without ThemeProvider with a theme prop on the component', () => {
  const SomeComponent = styled.div`
    color: ${props => props.theme.color || 'green'};
    background-color: yellow;
  `
  const tree = renderer
    .create(<SomeComponent theme={{ color: 'hotpink' }} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
