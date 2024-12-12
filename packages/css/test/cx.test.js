import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import renderer from 'react-test-renderer'
import { css, cx } from '@emotion/css'

describe('cx', () => {
  test('merge 2', async () => {
    const cls1 = css`
      font-size: 20px;
      background: green;
    `

    const tree = (
      await act(() => renderer.create(<div className={cx(cls1, 'modal')} />))
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('merge 3', async () => {
    const cls1 = css`
      font-size: 20px;
      background: green;
    `
    const cls2 = css`
      font-size: 20px;
      background: blue;
    `

    const tree = (
      await act(() =>
        renderer.create(<div className={cx(cls1, cls2, 'modal')} />)
      )
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('merge 4', async () => {
    const cls1 = css`
      font-size: 20px;
      background: green;
    `
    const cls2 = css`
      font-size: 20px;
      background: blue;
    `

    const tree = (
      await act(() =>
        renderer.create(<div className={cx(cls1, cls2, 'modal', 'profile')} />)
      )
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('all types', async () => {
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

    const tree = (
      await act(() =>
        renderer.create(
          <div
            className={cx(
              { [cls1]: foo },
              'modal',
              { [cls2]: bar },
              'profile',
              [[cls3, [cls4]]]
            )}
          />
        )
      )
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('fun fun functions', async () => {
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

    const tree = (
      await act(() =>
        renderer.create(
          <div
            className={cx([
              [cls1, false && cls2, 'modal'],
              [cls3, { [cls4]: true }, 'profile']
            ])}
          />
        )
      )
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('no extra whitespace', async () => {
    expect(cx('blockquote', '', 'news')).toMatchSnapshot()
    expect(cx('', 'group', '', 'news', '')).toMatchSnapshot()
    expect(cx('author', '')).toMatchSnapshot()
    expect(cx({ someClass: true, '': true })).toMatchSnapshot()
    expect(
      cx({ someClass: true, '': true, anotherClass: true })
    ).toMatchSnapshot()
  })
})
