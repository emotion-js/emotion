import 'test-utils/legacy-env'
import React from 'react'
import styled from '@emotion/styled'
import renderer from 'react-test-renderer'
import { css } from 'emotion'

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
    const tree = renderer
      .create(
        <div className={cls2}>
          <FakeComponent />
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
