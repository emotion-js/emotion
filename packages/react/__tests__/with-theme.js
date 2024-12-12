import React from 'react'
import { render } from '@testing-library/react'
import { withTheme, ThemeProvider } from '@emotion/react'

test('withTheme works', () => {
  class SomeComponent extends React.Component /* <{ theme: Object }> */ {
    render() {
      return this.props.theme.color
    }
  }
  let SomeComponentWithTheme = withTheme(SomeComponent)
  expect(
    render(
      <ThemeProvider theme={{ color: 'green' }}>
        <SomeComponentWithTheme />
      </ThemeProvider>
    ).container.firstChild
  ).toMatchSnapshot()
})

test('should forward the ref', () => {
  function SomeComponent(props) {
    return <div ref={props.ref}>{props.theme.color}</div>
  }

  const ComponentWithTheme = withTheme(SomeComponent)
  let ref = React.createRef()
  render(
    <ThemeProvider theme={{ color: 'green' }}>
      <ComponentWithTheme ref={ref} />
    </ThemeProvider>
  )
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
