import React from 'react'
import renderer from 'react-test-renderer'
import serializer from 'jest-glamor-react'
import { sheet, css, flush } from '../src/index'

expect.addSnapshotSerializer(serializer(sheet))

describe('css', () => {
  test('float property', () => {
    const cls1 = css`
      float: left
    `

    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('handles more than 10 dynamic properties', () => {
    const cls1 = css`
      text-decoration: ${'underline'};
      border-right: solid blue 54px;
      background: ${'white'};
      color: ${'black'};
      display: ${'block'};
      border-radius: ${'3px'};
      padding: ${'25px'};
      width: ${'500px'};
      z-index: ${100};
      font-size: ${'18px'};
      text-align: ${'center'};
    `

    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('composes with undefined values', () => {
    const cls2 = css`
      composes: ${undefined};
      justifyContent: center;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('random expression', () => {
    const cls2 = css`
      font-size: 20px;
      @media(min-width: 420px) {
        color: blue;
        ${css`width: 96px; height: 96px;`};
        line-height: 40px;
      }
      background: green;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
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
    expect(tree).toMatchSnapshot()
  })

  test('handles objects', () => {
    const cls1 = css({
      float: 'left',
      display: 'flex',
      color: `${'blue'}`,
      fontSize: `${'20px'}`,
      height: `${50}`,
      width: 20
    })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('computed key is only dynamic', () => {
    const cls1 = css({
      fontSize: 10,
      [`w${'idth'}`]: 20
    })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
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
    expect(tree).toMatchSnapshot()
  })
  test('@supports', () => {
    const cls1 = css`
      @supports (display: grid) {
        display: grid;
      }
    `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('nested at rules', () => {
    const cls1 = css`
    @supports (display: grid) {
      display: grid;
      @supports (display: flex) {
        display: flex;
      }
    }
    @media (min-width: 420px) {
      color: pink;
      @media (max-width: 500px) {
        color: hotpink;
      }
    }
  `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('nested array', () => {
    const cls1 = css([
      [
        {
          display: 'flex'
        }
      ]
    ])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('composition stuff', () => {
    const cls1 = css({
      justifyContent: 'center'
    })
    const cls2 = css([cls1])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
    const tree2 = renderer.create(<div className={cls2} />).toJSON()
    expect(tree2).toMatchSnapshot()
  })
  test('null rule', () => {
    const cls1 = css()

    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('css variables', () => {
    const cls1 = css`
      --some-var: 1px;
      width: var(--some-var);
    `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('flushes correctly', () => {
    const cls1 = css`
    display: flex;
  `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
    flush()
    const tree2 = renderer.create(<div className={cls1} />).toJSON()
    expect(tree2).toMatchSnapshot()
  })
})
