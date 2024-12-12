import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import styled from '@emotion/styled'
import { render } from '@testing-library/react'
import { css } from '@emotion/css'

describe('component selector', () => {
  test('should be converted to use the emotion target className', () => {
    const FakeComponent = styled.div`
      color: blue;
    `

    const cls2 = css`
      ${FakeComponent} {
        color: red;
      }
    `
    const { container } = render(
      <div className={cls2}>
        <FakeComponent />
      </div>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
