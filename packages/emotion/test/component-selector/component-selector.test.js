import React from 'react'
import styled from 'react-emotion'
import renderer from 'react-test-renderer'
import { css, flush, sheet } from 'emotion'
import { TARGET_KEY } from 'emotion-utils'

describe('component selector', () => {
  afterEach(() => flush())

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
    expect(sheet).toMatchSnapshot()
  })

  test('should throw if the missing the static targeting property', () => {
    const FakeComponent = styled.div`
      color: blue;
    `

    delete FakeComponent[TARGET_KEY]

    expect(() => {
      css`
        ${FakeComponent} {
          color: red;
        }
      `
    }).toThrow()
  })
})
