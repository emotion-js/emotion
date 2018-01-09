// @flow
import React from 'react'
import renderer from 'react-test-renderer'
import { css, cx } from 'emotion'

describe('cx', () => {
  test('merge 2', () => {
    const cls1 = css`
      font-size: 20px;
      background: green;
    `

    const tree = renderer.create(<div className={cx(cls1, 'modal')} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('merge 3', () => {
    const cls1 = css`
      font-size: 20px;
      background: green;
    `
    const cls2 = css`
      font-size: 20px;
      background: blue;
    `

    const tree = renderer
      .create(<div className={cx(cls1, cls2, 'modal')} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('merge 4', () => {
    const cls1 = css`
      font-size: 20px;
      background: green;
    `
    const cls2 = css`
      font-size: 20px;
      background: blue;
    `

    const tree = renderer
      .create(<div className={cx(cls1, cls2, 'modal', 'profile')} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('all types', () => {
    const cls1 = css`
      font-size: 20px;
      background: green;
    `
    const cls2 = css`
      font-size: 20px;
      background: blue;
    `

    const cls3 = css`
      font-size: 20px;
      background: darkorange;
    `

    const cls4 = css`
      font-size: 20px;
      background: darkgreen;
    `

    const foo = true
    const bar = false

    const tree = renderer
      .create(
        <div
          className={cx(
            { [cls1]: foo },
            { [cls2]: bar },
            () => 'modal',
            'profile',
            [[cls3, [cls4]]]
          )}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('fun fun functions', () => {
    const cls1 = css`
      font-size: 20px;
      background: green;
    `
    const cls2 = css`
      font-size: 20px;
      background: blue;
    `

    const cls3 = css`
      font-size: 20px;
      background: darkorange;
    `

    const cls4 = css`
      font-size: 20px;
      background: darkgreen;
    `

    const tree = renderer
      .create(
        <div
          className={cx(() => () => [
            () => [cls1, false && cls2, 'modal'],
            () => [() => [cls3, () => ({ [cls4]: true }), 'profile']],
          ])}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
