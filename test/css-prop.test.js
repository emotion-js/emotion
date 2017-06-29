/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import { matcher, serializer } from '../jest-utils'

// eslint-disable-next-line no-unused-vars
import { css, fragment } from '../src/index'

expect.addSnapshotSerializer(serializer)
expect.extend(matcher)

describe('css prop react', () => {
  test('basic', () => {
    const tree = renderer
      .create(
        <p css={`color: red;`}>
          hello world
        </p>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('string expression', () => {
    const tree = renderer
      .create(
        <p css="color:red;background:blue;font-size:48px;">
          hello world
        </p>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('kitchen sink', () => {
    const props = { online: false, error: false, radius: 5 }
    const huge = 100
    const tiny = 6

    const bold = fragment`
        display: flex;
        font-weight: bold;`

    const big = fragment`
        @apply ${bold};
        font-size: ${huge}`

    const small = fragment`
        font-size: ${tiny}`

    const flexCenter = fragment`
        display: flex;
        justify-content: center;
        align-items: center`

    const tree = renderer
      .create(
        <div
          className="css__legacy-stuff"
          css={`
              @apply ${bold}
              @apply ${flexCenter};
             `}
        >
          <h1
            css={`
                @apply ${props.error ? big : small};
                color: red
              `}
          >
            BOOM
          </h1>
          <p className="test_class1" css={`color: blue;`}>Hello</p>
          <p
            className="test_class1 test___class45"
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
