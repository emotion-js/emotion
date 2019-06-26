// @flow
import 'test-utils/legacy-env'
import React from 'react'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { render, cleanup } from '@testing-library/react'
import serializer from 'jest-emotion'

expect.addSnapshotSerializer(serializer)

afterEach(cleanup)

test('change theme', () => {
  const Div = styled.div`
    color: ${props => props.theme.primary};
  `
  const TestComponent = props => (
    <ThemeProvider theme={props.theme}>
      {props.renderChild ? <Div>this will be green then pink</Div> : null}
    </ThemeProvider>
  )
  const { container, rerender } = render(
    <TestComponent renderChild theme={{ primary: 'green' }} />
  )
  expect(container).toMatchSnapshot()
  rerender(<TestComponent renderChild theme={{ primary: 'pink' }} />)
  expect(container).toMatchSnapshot()
  rerender(<TestComponent renderChild={false} theme={{ primary: 'pink' }} />)
  expect(container).toMatchSnapshot()
})
