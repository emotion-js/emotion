import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'
import { css } from '@emotion/css'

describe('component selector', () => {
  test('should be converted to use the emotion target className', async () => {
    const FakeComponent = styled.div`
      color: blue;
    `

    const cls2 = css`
      ${FakeComponent} {
        color: red;
      }
    `
    const tree = (
      await act(() =>
        renderer.create(
          <div className={cls2}>
            <FakeComponent />
          </div>
        )
      )
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
