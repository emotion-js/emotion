import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ThemeProvider, withTheme } from 'emotion-theming'

import emotionPrimitive from '../src'

Enzyme.configure({ adapter: new Adapter() })

const theme = { backgroundColor: 'magenta' }

describe('Emotion primitives', () => {
  test('should not throw an error when used valid primitive', () => {
    expect(() => emotionPrimitive.text({})).not.toThrow()
  })

  test('should throw an error when used invalid primitive', () => {
    expect(() => emotionPrimitive.TEXT({})).toThrowError(
      `Cannot style invalid primitive TEXT. Expected primitive to be one of ['Text', 'View', 'Image']`
    )
  })

  test('theme', () => {
    const T = withTheme(emotionPrimitive.text`color: red; backgroundColor: ${props => props.theme.backgroundColor}`)

    const tree = renderer.create(<ThemeProvider theme={theme}><T bg='red'>Hello</T></ThemeProvider>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('should render the primitive when styles applied using object style notation', () => {
    const Text = emotionPrimitive.text`color: red; font-size: 20px; background-color: ${props =>
      props.back};`
    const tree = renderer
      .create(
        <Text back="red" fontSize={40}>
          Emotion Primitives
        </Text>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render the primitive on changing the props', () => {
    const Text = emotionPrimitive.text({ padding: '20px' }, props => ({
      color: props.decor
    }))
    const tree = renderer
      .create(<Text decor="hotpink">Emotion Primitives</Text>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render primitive with style prop', () => {
    const Title = emotionPrimitive.text`color: hotpink;`
    const tree = renderer
      .create(<Title style={{ padding: 10 }}>Emotion primitives</Title>)
      .toJSON()
    expect(tree).toMatchSnapshot()
    const wrapper = Enzyme.shallow(
      <Title style={{ padding: 10 }}>Emotion primitives</Title>
    )
    expect(wrapper.find('Text').prop('style')).toEqual([77, { padding: 10 }])
  })

  test('primitive should work with `withComponent`', () => {
    const Text = emotionPrimitive.text`color: ${props => props.decor};`
    const Name = Text.withComponent('Text')
    const tree = renderer.create(<Name decor="hotpink">Mike</Name>).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('should render primitive with css overrides', () => {
    const Text = emotionPrimitive.text`color: hotpink;`
    const tree = renderer.create(<Text fontSize={40}>Emotions</Text>).toJSON()
    expect(tree).toMatchSnapshot()
    const wrapper = Enzyme.shallow(<Text fontSize={20}>Emotions</Text>)
    expect(wrapper.find('Text').prop('style')).toEqual([80, { fontSize: 20 }])
  })

  it('should render <Image />', () => {
    const Image = emotionPrimitive.image`
      border: 2px solid hotpink;
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
