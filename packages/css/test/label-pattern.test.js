import 'test-utils/setup-env'
import React from 'react'
import { render } from '@testing-library/react'
import styled from '@emotion/styled'
import { flush } from '@emotion/css'

describe('label pattern', () => {
  afterEach(() => flush())

  test('input + label styled', () => {
    const Input = styled.input`
      & + label::after {
        color: pink;
        background: orange;
      }
    `

    const { container } = render(
      <div>
        <Input />
        <label>Label</label>
      </div>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
