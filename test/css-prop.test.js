/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import { css, sheet } from '../src/index'

expect.addSnapshotSerializer(serializer(sheet))

describe('css prop react', () => {
  test('basic', () => {
    const fontSize = '1px'
    const tree = renderer
      .create(<p css={`color: red;font-size:${fontSize}`}>hello world</p>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('string expression', () => {
    const tree = renderer
      .create(
        <p css='color:red;background:blue;font-size:48px;'>hello world</p>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('kitchen sink', () => {
    const props = { online: false, error: false, radius: 5 }
    const huge = 100
    const tiny = 6

    const bold = css`
        display: flex;
        font-weight: bold;`

    const big = css`
        composes: ${bold};
        font-size: ${huge}`

    const small = css`
        font-size: ${tiny}`

    const flexCenter = css`
        display: flex;
        justify-content: center;
        align-items: center`

    const tree = renderer
      .create(
        <div
          className='css__legacy-stuff'
          css={`
              composes: ${bold} ${flexCenter};
             `}
        >
          <h1
            css={`
                composes: ${props.error ? big : small};
                color: red
              `}
          >
            BOOM
          </h1>
          <p className='test_class1' css={`color: blue;`}>
            Hello
          </p>
          <p
            className='test_class1 test___class45'
            css={`display: inline-flex`}
          >
            World
          </p>
          <p
            css={`
                color: red;
                border-radius: ${props.radius};
                &:hover {
                  font-weight: bold;
                  color: ${props.online ? 'green' : 'gray'};
                }
              `}
          >
            hello world
          </p>
        </div>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
