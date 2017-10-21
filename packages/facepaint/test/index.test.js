import React from 'react'
import renderer from 'react-test-renderer'
import { sheet, flush } from 'emotion'

import facepaint from 'facepaint'

const mq = facepaint([
  '@media(min-width: 420px)',
  '@media(min-width: 920px)',
  '@media(min-width: 1120px)'
])

describe('facepaint', () => {
  afterEach(() => flush())
  test('basic', () => {
    const result = mq({ color: ['red', 'green', 'blue', 'darkorchid'] })
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>Basic</div>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('multiple', () => {
    const result = mq({
      color: ['red', 'green', 'blue', 'darkorchid'],
      display: ['flex', 'block', 'inline-block', 'table'],
      fontSize: 12,
      alignItems: 'center'
    })
    expect(result).toMatchSnapshot()
    const tree = renderer.create(<div css={result}>multiple</div>).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })

  test('nested', () => {
    const result = mq({
      width: ['25%', '50%', '75%', '100%'],
      '& .foo': {
        color: ['red', 'green', 'blue', 'darkorchid'],
        '& img': {
          height: [10, 15, 20, 25]
        }
      }
    })
    expect(result).toMatchSnapshot()
    const tree = renderer
      .create(
        <div css={result}>
          <div className="foo">foo</div>
          function
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
})
