import 'test-utils/legacy-env'
import React from 'react'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'
import { flush } from 'emotion'

describe('label pattern', () => {
  afterEach(() => flush())

  test('input + label styled', () => {
    const Input = styled.input`
      & + label::after {
        color: pink;
        background: orange;
      }
    `

    const tree = renderer
      .create(
        <div>
          <Input />
          <label>Label</label>
        </div>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
