import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { withTheme, ThemeProvider } from '@emotion/react'

test('withTheme works', () => {
  class SomeComponent extends React.Component /* <{ theme: Object }> */ {
    render() {
      return this.props.theme.color
    }
  }
  let SomeComponentWithTheme = withTheme(SomeComponent)
  expect(
    renderer
      .create(
        <ThemeProvider theme={{ color: 'green' }}>
          <SomeComponentWithTheme />
        </ThemeProvider>
      )
      .toJSON()
  ).toMatchSnapshot()
})

test.skip('should forward the ref', () => {
  function SomeComponent(props) {
    return <div ref={props.ref}>{props.theme.color}</div>
  }

  const ComponentWithTheme = withTheme(SomeComponent)
  let ref = React.createRef()
  renderer.create(
    <ThemeProvider theme={{ color: 'green' }}>
      <ComponentWithTheme ref={ref} />
    </ThemeProvider>
  )
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
