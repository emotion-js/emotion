/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { matcher, serializer } from '../../jest-utils'
import { keyframes, sheet } from '../../src/macro'
import styled from '../../src/react/macro'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

describe('keyframes', () => {
  test('renders', () => {
    const fontSize = 20
    const bounce = keyframes`
      from, 20%, 53%, 80%, to {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
        transform: translate3d(0,0,0);
      }
    
      40%, 43% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -30px, 0);
      }
    
      70% {
        animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
        transform: translate3d(0, -15px, 0);
      }
    
      90% {
        transform: translate3d(0,-4px,0);
      }
    `

    const H1 = styled.h1`
      font-size: ${fontSize}px;
      animation: ${bounce} 2s linear infinite;
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })
  test('keyframes with interpolation', () => {
    const endingRotation = '360deg'
    keyframes`
      from {
        transform: rotate(0deg);
      }
    
      to {
        transform: rotate(${endingRotation});
      }
    `
    expect(
      sheet.tags.map(tag => tag.textContent || '').join('')
    ).toMatchSnapshot()
  })
})
