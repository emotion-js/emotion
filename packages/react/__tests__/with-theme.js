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

test(`withTheme(Comp) hoists non-react static class properties`, () => {
  class ExampleComponent extends React.Component {
    static displayName = 'foo'
    static someSpecialStatic = 'bar'
  }

  const ComponentWithTheme = withTheme(ExampleComponent)

  expect(ComponentWithTheme.displayName).toBe('WithTheme(foo)')
  expect(ComponentWithTheme.someSpecialStatic).toBe(
    ExampleComponent.someSpecialStatic
  )
})

test('should forward the ref', () => {
  class SomeComponent extends React.Component {
    render() {
      return this.props.theme.color
    }
  }

  const ComponentWithTheme = withTheme(SomeComponent)
  let ref = React.createRef()
  renderer.create(
    <ThemeProvider theme={{ color: 'green' }}>
      <ComponentWithTheme ref={ref} />
    </ThemeProvider>
  )
  expect(ref.current).toBeInstanceOf(SomeComponent)
})
