import React from 'react'
import renderer from 'react-test-renderer'
import { css, sheet } from 'emotion'

describe('css', () => {
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
    const tree = renderer.create(<div className={cls1}/>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
})
