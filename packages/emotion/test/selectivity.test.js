import React from 'react'
import renderer from 'react-test-renderer'
import { css, sheet } from 'emotion'

describe('css', () => {
  test('complex nested styles', () => {
    const mq = [
      '@media(min-width: 420px)',
      '@media(min-width: 640px)',
      '@media(min-width: 960px)'
    ]

    const cls1 = css({
      color: 'blue',
      '&:hover': {
        '& .name': {
          color: 'amethyst',
          '&:focus': {
            color: 'burlywood',
            [mq[0]]: {
              color: 'rebeccapurple'
            }
          }
        },
        color: 'green'
      }
    })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('complex nested media queries', () => {
    const cls1 = css`
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

    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('handles media query merges', () => {
    const mq = [
      '@media(min-width: 420px)',
      '@media(min-width: 640px)',
      '@media(min-width: 960px)'
    ]
    const buttonCSS = [
      {
        color: 'red',
        [mq[1]]: {
          color: 'blue'
        }
      },
      {
        color: 'purple',
        [mq[1]]: {
          color: 'aquamarine'
        }
      }
    ]

    const cls1 = css([
      {
        color: 'darkslateblue',
        [mq[0]]: {
          color: 'amethyst'
        },
        [mq[1]]: {
          color: 'rebeccapurple'
        },
        [mq[2]]: {
          color: 'burlywood'
        }
      },
      buttonCSS
    ])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('selectivity sheet', () => {
    expect(sheet).toMatchSnapshot()
  })
})
