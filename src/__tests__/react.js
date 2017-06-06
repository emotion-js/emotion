/* eslint-disable jsx-quotes,no-useless-escape,no-template-curly-in-string */
/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'
import css, {fragment} from 'glam'
import {emotion} from '../react'

describe('glam react', () => {
  test('basic render', () => {
    const fontSize = 20
    const H1 = emotion.h1`
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(
        <H1>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('attr', () => {
    const H1 = emotion.h1`
      font-size: attr(fontSize);
      margin: attr(margin rem, 4);
    `

    const Title = ({title}) => {
      return (
        <H1 fontSize={48}>
          {title}
        </H1>
      )
    }

    const tree = renderer
      .create(
        <Title />
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('call expression', () => {
    const fontSize = 20
    const H1 = emotion('h1')`
      font-size: ${fontSize}px;
    `

    const tree = renderer
      .create(
        <H1 className={'legacy__class'}>
          hello world
        </H1>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('composition', () => {
    const fontSize = 20
    const H1 = emotion('h1')`
      font-size: ${fontSize}px;
    `

    const H2 = emotion(H1)`font-size: ${fontSize * 2 / 3}`

    const tree = renderer
      .create(
        <H2 className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('function in expression', () => {
    const fontSize = 20
    const H1 = emotion('h1')`
      font-size: ${fontSize}px;
    `

    const H2 = emotion(H1)`font-size: ${({scale}) => fontSize * scale}`

    const tree = renderer
      .create(
        <H2 scale={2} className={'legacy__class'}>
          hello world
        </H2>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('higher order component', () => {
    const fontSize = 20
    const Content = emotion('div')`
      font-size: ${fontSize}px;
    `

    const flexColumn = Component => {
      const NewComponent = emotion(Component)`
        flex-direction: column;
      `
      NewComponent.displayName = `flexColumn${Component.displayName}`

      return NewComponent
    }

    const ColumnContent = flexColumn(Content)

    expect(ColumnContent.displayName).toBe('flexColumnundefined')

    const tree = renderer
      .create(
        <ColumnContent>
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
          <div
            css={`height: 100px; width: 100px; background-color: #20c997; margin: 8ch;`}
          />
        </ColumnContent>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

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
    const props = {online: false, error: false, radius: 5}
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
