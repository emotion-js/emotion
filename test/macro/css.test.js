/* eslint-env jest */
import { css } from '../../src/macro'
import { sheet } from '../../src'
import React from 'react'
import renderer from 'react-test-renderer'
import { matcher, serializer } from 'jest-glamor-react'

expect.addSnapshotSerializer(serializer(sheet))
expect.extend(matcher)

describe('css macro', () => {
  test('handles more than 10 dynamic properties', () => {
    const cls1 = css`
      background: ${'white'};
      color: ${'black'};
      text-decoration: ${'underline'};
      display: ${'block'};
      border-radius: ${'3px'};
      padding: ${'25px'};
      width: ${'500px'};
      z-index: ${100};
      font-size: ${'18px'};
      text-align: ${'center'};
      border: ${'solid 1px red'};
    `

    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshotWithGlamor()
  })

  test('composes with undefined values', () => {
    const cls2 = css`
      composes: ${undefined};
      justifyContent: center;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshotWithGlamor()
  })

  test('composes', () => {
    const cls1 = css`
      display: flex;
    `
    const cls2 = css`
      composes: ${cls1};
      justifyContent: center;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshotWithGlamor()
  })

  test('handles objects', () => {
    const cls1 = css({ display: 'flex' })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshotWithGlamor()
  })

  test('composes with objects', () => {
    const cls1 = css({
      display: ['flex', 'block'],
      width: 30,
      height: 'calc(40vw - 50px)',
      ':hover': { color: 'blue' },
      ':after': {
        content: '" "',
        color: 'red'
      },
      '@media(min-width: 420px)': {
        color: 'green'
      }
    })
    const cls2 = css`
      composes: ${cls1};
      justifyContent: center;
    `

    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshotWithGlamor()
  })
})
