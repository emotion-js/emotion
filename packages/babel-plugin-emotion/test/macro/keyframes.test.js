// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import { keyframes, sheet, flush } from 'emotion/macro'
import styled from 'react-emotion/macro'

describe('keyframes - macro', () => {
  afterEach(() => {
    flush()
  })
  test('renders', () => {
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
      animation: ${bounce} 2s linear infinite;
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
  test('keyframes with interpolation', () => {
    const endingRotation = '360deg'

    const H1 = styled.h1`
      animation: ${keyframes`
      from {
        transform: rotate(0deg);
      }
    
      to {
        transform: rotate(${endingRotation});
      }
    `} 2s linear infinite;
    `

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshot()

    expect(sheet).toMatchSnapshot()
  })
})
