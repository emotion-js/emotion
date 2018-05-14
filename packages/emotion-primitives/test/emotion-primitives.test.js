import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ThemeProvider } from 'emotion-theming'
import { Text, StyleSheet } from 'react-primitives'

import { emotionPrimitive } from '../src'

const styles = StyleSheet.create({
  foo: {
    fontWeight: 'bold'
  }
})

Enzyme.configure({ adapter: new Adapter() })

const Title = emotionPrimitive('Text')`
  font-size: 10em;
  color: hotpink;
`

const TitleObj = emotionPrimitive('Text')(
  {
    fontSize: '10',
    color: 'hotpink'
  },
  props => ({ padding: props.padding || 10 })
)

const View = emotionPrimitive('View')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20;
`

describe('Emotion primitives', () => {
  it('should not throw an error when passed a valid primitive', () => {
    expect(() => emotionPrimitive('View')``).not.toThrowError()
  })

  it('should give an error message when passed an invalid primitive', () => {
    expect(() => emotionPrimitive('text')).toThrow(
      `text is an invalid primitive. Expected primitive to be one of ['Text', 'View', 'Image'].`
    )
  })

  it('should render <Text />', () => {
    const tree = renderer.create(<Title>Emotion primitives</Title>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('primitive should work with theme', () => {
    const Text = emotionPrimitive('Text')(
      {
        fontSize: 20
      },
      props => ({ color: props.theme.color })
    )

    const tree = renderer
      .create(
        <ThemeProvider theme={{ color: 'mistyrose' }}>
          <Text>Hello World</Text>
        </ThemeProvider>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render <Text /> with style prop', () => {
    const tree = renderer
      .create(<Title style={{ padding: 10 }}>Emotion primitives</Title>)
      .toJSON()

    expect(tree).toMatchSnapshot()

    const wrapper = Enzyme.shallow(
      <Title style={{ padding: 10 }}>Emotion primitives</Title>
    )

    expect(wrapper.find('Text').prop('style')).toEqual({ padding: 10 })
  })

  it('should render <Text /> when passed props using object styles', () => {
    const tree = renderer
      .create(<TitleObj padding={20}>Emotion primitives</TitleObj>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render <View />', () => {
    const tree = renderer.create(<View />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should work with `withComponent`', () => {
    const Name = Title.withComponent(Text)

    const tree = renderer.create(<Name>Mike</Name>).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should work with StyleSheet.create', () => {
    const tree = renderer
      .create(<Title style={styles.foo}>Emotion</Title>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should render <View /> with style prop', () => {
    const tree = renderer.create(<View style={{ padding: 30 }} />).toJSON()

    expect(tree).toMatchSnapshot()

    const wrapper = Enzyme.shallow(<View style={{ padding: 20 }} />)

    expect(wrapper.find('View').prop('style')).toEqual({ padding: 20 })
  })

  it('should render <Image />', () => {
    const Image = emotionPrimitive('Image')`
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
