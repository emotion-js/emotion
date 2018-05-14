import React from 'react'
import primitives from 'react-primitives'
import { renderStylesOnNative } from './emotion-native'

const Platform = primitives.Platform

const TAGS = ['Text', 'View', 'Image']

/*
  Emotion primitive - Use this function instead of 'styled' to render the styles using emotion on Web, React Native and Sketch.

  Tradeoffs -

  * Passing props in string template literal is not supported yet when used with React Native. But you can pass props when using the object styles.
  * Compute time is more so the render on Sketch is slow right now.
  * Need to tweak the webpack config when used with Sketch in order suppress warnings for 'fs' module.
  * Cannot use shorthand because it requires babel plugin.
  * Need to pass primitives[tag_name] when withComponent is used.

  Usage -

  const Text = emotionPrimitive('Text')`
    color: hotpink;
    font-size: 30px;
  `

  render(<Text>Hello</Text>)

  const View = emotionPrimitive('View')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }, (props) => {
    color: props.color
  })

  render(<View color='mistyrose' />)

  const Title = Text.withComponent('Text')

  render(<Title>Hello</Title>)
*/
export const emotionPrimitive = tag => {
  if (Platform.OS === 'web') {
    const styled = require('react-emotion').default

    if (typeof tag !== 'string') {
      throw new Error('Expected primitive name to be a string')
    }

    if (TAGS.includes(tag)) {
      // TODO: Assign primitives directly to styled constructor
      return styled(primitives[tag])
    }

    throw new Error(
      `${tag} is an invalid primitive. Expected primitive to be one of ['Text', 'View', 'Image'].`
    )
  } else {
    // For React Native and Sketch
    return (...args) => renderStylesOnNative(tag, args)
  }
}
