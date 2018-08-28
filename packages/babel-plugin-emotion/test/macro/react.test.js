// @flow
import 'test-utils/legacy-env'
import React from 'react'
import renderer from 'react-test-renderer'
import styled from 'react-emotion/macro'

test('no dynamic', () => {
  const H1 = styled.h1`
    float: left;
  `

  const tree = renderer.create(<H1>hello world</H1>).toJSON()

  expect(tree).toMatchSnapshot()
})

test('basic render', () => {
  const fontSize = 20
  const H1 = styled.h1`
    color: blue;
    font-size: ${fontSize + 'px'};
    @media (min-width: 420px) {
      color: blue;
    }
  `

  const tree = renderer.create(<H1>hello world</H1>).toJSON()

  expect(tree).toMatchSnapshot()
})

test('basic render with object as style', () => {
  const fontSize = 20
  const H1 = styled.h1({ fontSize })

  const tree = renderer.create(<H1>hello world</H1>).toJSON()

  expect(tree).toMatchSnapshot()
})

test('object as style', () => {
  const H1 = styled.h1(
    props => ({
      fontSize: props.fontSize
    }),
    props => ({ flex: props.flex }),
    { display: 'flex' }
  )

  const tree = renderer
    .create(
      <H1 fontSize={20} flex={1}>
        hello world
      </H1>
    )
    .toJSON()

  expect(tree).toMatchSnapshot()
})
