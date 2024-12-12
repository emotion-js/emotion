import * as React from 'react'
import { Text, StyleSheet } from 'react-primitives'
import { ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'

import styled from '@emotion/primitives'

jest.mock('react-primitives')

const theme = { backgroundColor: 'magenta', display: 'flex' }

describe('Emotion primitives', () => {
  test('should not throw an error when used valid primitive', () => {
    expect(() => styled.Text({})).not.toThrow()
  })

  test('should throw an error when used invalid primitive', () => {
    expect(() => styled.TEXT({})).toThrow()
  })

  test('should render the primitive when styles applied using object style notation', () => {
    const Text = styled.Text`
      color: red;
      font-size: 20px;
      background-color: ${props => props.back};
    `
    const { container } = render(
      <Text style={{ fontSize: 40 }} back="red">
        Emotion Primitives
      </Text>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('should work with theming from @emotion/react', () => {
    const Text = styled.Text`
      color: ${props => props.theme.backgroundColor};
    `

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Text>Hello World</Text>
      </ThemeProvider>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('should unmount with theming', () => {
    const StyledText = styled.Text`
      display: ${props => props.theme.display};
    `

    const { container, unmount } = render(
      <ThemeProvider theme={theme}>
        <StyledText id="something" style={{ backgroundColor: 'yellow' }}>
          Hello World
        </StyledText>
      </ThemeProvider>
    )
    expect(container).toMatchSnapshot()
    unmount()
    expect(container.querySelector('#something')).toBe(null)
  })

  test('should render the primitive on changing the props', () => {
    const Text = styled.Text({ padding: '20px' }, props => ({
      color: props.decor
    }))
    const { container } = render(
      <Text decor="hotpink">Emotion Primitives</Text>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('should render primitive with style prop', () => {
    const Title = styled.Text`
      color: hotpink;
    `
    const { container } = render(
      <Title style={{ padding: 10 }}>Emotion primitives</Title>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('should work with StyleSheet.create API', () => {
    const styles = StyleSheet.create({ foo: { color: 'red' } })
    const Text = styled.Text`
      font-size: 10px;
    `

    const { container } = render(
      <Text style={styles.foo}>Emotion Primitives</Text>
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('primitive should work with `withComponent`', () => {
    const StyledText = styled.Text`
      color: ${props => props.decor};
    `
    const Name = StyledText.withComponent(Text)
    const { container } = render(<Name decor="hotpink">Mike</Name>)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should style any other component', () => {
    const Text = styled.Text`
      color: hotpink;
    `
    const Title = () => <Text>Hello World</Text>
    const StyledTitle = styled(Title)`
      font-size: 20px;
      font-style: ${props => props.sty};
    `
    const { container } = render(<StyledTitle sty="italic" />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('ref', () => {
    const StyledText = styled.Text`
      color: hotpink;
    `
    let ref = React.createRef()
    const { container, unmount } = render(
      <StyledText ref={ref} id="something" />
    )
    expect(ref.current).toBe(container.firstElementChild)
    unmount()
  })

  test('should pass props in withComponent', () => {
    const ViewOne = styled.View`
      background-color: ${props => props.color};
    `
    const treeOne = renderer.create(<ViewOne color="green" />)
    const ViewTwo = ViewOne.withComponent(Text)
    const treeTwo = renderer.create(<ViewTwo color="hotpink" />)

    expect(treeOne).toMatchSnapshot()
    expect(treeTwo).toMatchSnapshot()
  })

  test('should render <Image />', () => {
    const Image = styled.Image`
      border: 2px solid hotpink;
    `
    const { container } = render(
      <Image
        source={{
          uri: 'https://camo.githubusercontent.com/209bdea972b9b6ef90220c59ecbe66d35ffefa8a/68747470733a2f2f63646e2e7261776769742e636f6d2f746b6834342f656d6f74696f6e2f6d61737465722f656d6f74696f6e2e706e67',
          height: 150,
          width: 150
        }}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('custom shouldForwardProp works', () => {
    const Text = styled.Text``
    const Title = props => <Text {...props} />
    const StyledTitle = styled(Title, {
      shouldForwardProp: prop => prop !== 'color' && prop !== 'theme'
    })`
      color: ${props => props.color};
    `

    const { container } = render(
      <StyledTitle color="hotpink">{'Emotion'}</StyledTitle>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
