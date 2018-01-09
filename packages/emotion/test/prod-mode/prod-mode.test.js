// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import { css, sheet, flush } from 'emotion'

describe('production mode', () => {
  afterEach(() => flush())
  test('production mode basic', () => {
    const cls1 = css`
      color: yellow;
      & .some-class {
        display: flex;
        & .some-other-class {
          background-color: hotpink;
        }
        @media (max-width: 600px) {
          background-color: pink;
        }
      }
    `
    const tree = renderer
      .create(
        <div className={cls1}>
          <div className="some-class">
            <div className="some-other-class" />
          </div>
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('production mode nested styles', () => {
    const mq = [
      '@media(min-width: 420px)',
      '@media(min-width: 640px)',
      '@media(min-width: 960px)',
    ]

    css({
      color: 'blue',
      '&:hover': {
        '& .name': {
          color: 'amethyst',
          '&:focus': {
            color: 'burlywood',
            [mq[0]]: {
              color: 'rebeccapurple',
            },
          },
        },
        color: 'green',
      },
    })
    expect(sheet).toMatchSnapshot()
  })

  test('production mode nested media queries', () => {
    css`
      @media (max-width: 600px) {
        h1 {
          font-size: 1.4rem;
        }
      }

      @media (max-width: 400px), (max-height: 420px) {
        h1 {
          font-size: 1.1rem;
        }
      }
    `

    expect(sheet).toMatchSnapshot()
  })
})
