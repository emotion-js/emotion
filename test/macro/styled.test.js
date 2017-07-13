/* eslint-env jest */
import styled from '../../src/react/macro'
import React from 'react'
import renderer from 'react-test-renderer'
import { matcher, serializer } from '../../jest-utils'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

describe('styled macro', () => {
  test('basic', () => {
    const fontSize = 20
    const H1 = styled.h1`font-size: ${fontSize}px;`

    const tree = renderer.create(<H1>hello world</H1>).toJSON()

    expect(tree).toMatchSnapshotWithEmotion()
  })
})
