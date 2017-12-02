// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import { css } from 'emotion'

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
        <p css="color:red;background:blue;font-size:48px;">hello world</p>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('objects', () => {
    const fontSize = '1px'
    const tree = renderer
      .create(<p css={{ color: 'red', fontSize }}>hello world</p>)
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('kitchen sink', () => {
    const props = { online: false, error: false, radius: 5 }
    const huge = 100
    const tiny = 6

    const bold = css`
      display: flex;
      font-weight: bold;
    `

    const big = css`
      ${bold};
      font-size: ${huge};
    `

    const small = css`
      font-size: ${tiny};
    `

    const flexCenter = css`
      display: flex;
      justify-content: center;
      align-items: center;
    `

    const tree = renderer
      .create(
        <div
          className="css__legacy-stuff"
          css={`
              ${bold}; ${flexCenter};
             `}
        >
          <h1
            css={`
                ${props.error ? big : small};
                color: red
              `}
          >
            BOOM
          </h1>
          <p className="test_class1" css={`color: blue;`}>
            Hello
          </p>
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
  test('specificity with composition', () => {
    const flex = css`
      display: flex;
    `
    const tree = renderer
      .create(<div className={flex} css={`display: block;`} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('merging regular classes', () => {
    const someClass = 'some-class'
    const tree = renderer
      .create(<div className={someClass} css={`display: block;`} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
