import * as React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'emotion-theming'

import styled from '@emotion/native'
import reactNative from 'react-native'

const StyleSheet = reactNative.StyleSheet

jest.mock('react-native')

const theme = { backgroundColor: 'magenta', display: 'flex' }

describe('Emotion native styled', () => {
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
    const tree = renderer
      .create(
        <Text style={{ fontSize: 40 }} back="red">
          Emotion Primitives
        </Text>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should work with emotion-theming', () => {
    const Text = styled.Text`
      color: ${props => props.theme.backgroundColor};
    `

    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Text>Hello World</Text>
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('should render the primitive on changing the props', () => {
    const Text = styled.Text({ padding: '20px' }, props => ({
      color: props.decor
    }))
    const tree = renderer
      .create(<Text decor="hotpink">Emotion Primitives</Text>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render primitive with style prop', () => {
    const Title = styled.Text`
      color: hotpink;
    `
    const tree = renderer
      .create(<Title style={{ padding: 10 }}>Emotion primitives</Title>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should work with StyleSheet.create API', () => {
    const styles = StyleSheet.create({ foo: { color: 'red' } })
    const Text = styled.Text`
      font-size: 10px;
    `
    const tree = renderer
      .create(<Text style={styles.foo}>Emotion primitives</Text>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('primitive should work with `withComponent`', () => {
    const Text = styled.Text`
      color: ${props => props.decor};
    `
    const Name = Text.withComponent(reactNative.Text)
    const tree = renderer.create(<Name decor="hotpink">Mike</Name>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should style any other component', () => {
    const Text = styled.Text`
      color: hotpink;
    `
    const Title = () => <Text>Hello World</Text>
    const StyledTitle = styled(Title)`
      font-size: 20px;
      font-style: ${props => props.sty};
    `
    const tree = renderer.create(<StyledTitle sty="italic" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should pass props in withComponent', () => {
    const ViewOne = styled.View`
      background-color: ${props => props.color};
    `
    const treeOne = renderer.create(<ViewOne color="green" />)
    const ViewTwo = ViewOne.withComponent(reactNative.Text)
    const treeTwo = renderer.create(<ViewTwo color="hotpink" />)

    expect(treeOne).toMatchSnapshot()
    expect(treeTwo).toMatchSnapshot()
  })

  it('should render <Image />', () => {
    const Image = styled.Image`
      border-radius: 2px;
    `
    const tree = renderer
      .create(
        <Image
          source={{
            uri:
              'https://camo.githubusercontent.com/209bdea972b9b6ef90220c59ecbe66d35ffefa8a/68747470733a2f2f63646e2e7261776769742e636f6d2f746b6834342f656d6f74696f6e2f6d61737465722f656d6f74696f6e2e706e67',
            height: 150,
            width: 150
          }}
        />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
