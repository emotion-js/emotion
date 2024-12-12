import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'
import { flush } from '@emotion/css'

describe('label pattern', () => {
  afterEach(() => flush())

  test('input + label styled', async () => {
    const Input = styled.input`
      & + label::after {
        color: pink;
        background: orange;
      }
    `

    const tree = (
      await act(() =>
        renderer.create(
          <div>
            <Input />
            <label>Label</label>
          </div>
        )
      )
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
