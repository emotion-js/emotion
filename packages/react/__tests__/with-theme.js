import React from 'react'
import { act } from 'react'
import renderer from 'react-test-renderer'
import { withTheme, ThemeProvider } from '@emotion/react'

test('withTheme works', async () => {
  class SomeComponent extends React.Component /* <{ theme: Object }> */ {
    render() {
      return this.props.theme.color
    }
  }
  let SomeComponentWithTheme = withTheme(SomeComponent)
  expect(
    (
      await (() =>
        renderer.create(
          <ThemeProvider theme={{ color: 'green' }}>
            <SomeComponentWithTheme />
          </ThemeProvider>
        ))
    ).toJSON()
  ).toMatchSnapshot()
})

test('should forward the ref', async () => {
  function SomeComponent(props) {
    return <div ref={props.ref}>{props.theme.color}</div>
  }

  const ComponentWithTheme = withTheme(SomeComponent)
  let ref = React.createRef()
  await act(() =>
    renderer.create(
      <ThemeProvider theme={{ color: 'green' }}>
        <ComponentWithTheme ref={ref} />
      </ThemeProvider>
    )
  )
  expect(ref.current).toBeInstanceOf(HTMLDivElement)
})
