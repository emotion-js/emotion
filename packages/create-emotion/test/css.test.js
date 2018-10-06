// @flow
import 'test-utils/legacy-env'
import 'test-utils/next-env'
import React from 'react'
import renderer from 'react-test-renderer'
import { css as differentCss, flush, sheet } from './emotion-instance'

describe('css', () => {
  test('float property', () => {
    const cls1 = differentCss`
      float: left;
    `

    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('handles more than 10 dynamic properties', () => {
    const cls1 = differentCss`
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

  test('falsy value in nested selector on object', () => {
    const cls1 = differentCss({ ':hover': { display: null, color: 'hotpink' } })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('boolean as value', () => {
    const cls1 = differentCss({
      display: 'flex',
      color: false,
      backgroundColor: true
    })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('auto px', () => {
    const cls1 = differentCss({ display: 'flex', flex: 1, fontSize: 10 })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('random interpolation with undefined values', () => {
    const cls2 = differentCss`
      ${undefined};
      justify-content: center;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('random expression', () => {
    const cls2 = differentCss`
      font-size: 20px;
      @media (min-width: 420px) {
        color: blue;
        ${differentCss`
          width: 96px;
          height: 96px;
        `};
        line-height: 40px;
      }
      background: green;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('simple composition', () => {
    const cls1 = differentCss`
      display: flex;
      &:hover {
        color: hotpink;
      }
    `
    const cls2 = differentCss`
      ${cls1};
      justify-content: center;
    `
    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('handles objects', () => {
    const cls1 = differentCss({
      float: 'left',
      display: 'flex',
      color: `${'blue'}`,
      fontSize: `${'20px'}`,
      height: 50,
      width: 20
    })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('handles array of objects', () => {
    const cls1 = differentCss([{ height: 50, width: 20 }, null])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('computed key is only dynamic', () => {
    const cls1 = differentCss({ fontSize: 10, [`w${'idth'}`]: 20 })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('composition with objects', () => {
    const cls1 = differentCss({
      display: 'flex',
      width: 30,
      height: 'calc(40vw - 50px)',
      '&:hover': { color: 'blue' },
      ':after': {
        content: '" "',
        color: 'red'
      },
      '@media(min-width: 420px)': {
        color: 'green'
      }
    })
    const cls2 = differentCss`
      ${cls1};
      justify-content: center;
    `

    const tree = renderer.create(<div className={cls2} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('@supports', () => {
    const cls1 = differentCss`
      @supports (display: grid) {
        display: grid;
      }
    `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test.skip('nested at rules', () => {
    const cls1 = differentCss`
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
    const cls1 = differentCss([
      [{ display: 'inline' }],
      [{ display: 'inline-block' }],
      [
        { display: 'block' },
        [
          { display: 'flex' },
          [
            { display: 'table' },
            { color: 'darkorchid' },
            [
              {
                fontSize: 16
              },
              [{ '&:after': { backgroundColor: 'aquamarine' } }]
            ]
          ]
        ]
      ]
    ])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('explicit false', () => {
    const cls1 = differentCss(false)
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('array with explicit false', () => {
    const cls1 = differentCss([[{ display: 'flex' }], false])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('array with explicit true', () => {
    const cls1 = differentCss([[{ display: 'flex' }], true])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('nested', () => {
    const cls1 = differentCss`
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
  test('explicit &', () => {
    flush()
    const cls1 = differentCss`
      &.another-class {
        display: flex;
      }
    `
    const tree = renderer
      .create(<div className={`${cls1} another-class`} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
    flush()
  })
  test('falsy property value in object', () => {
    const cls = differentCss({ display: 'flex', backgroundColor: undefined })
    const tree = renderer.create(<div className={cls} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('registered styles as nested selector value in object', () => {
    const cls = differentCss({ display: 'flex', backgroundColor: 'hotpink' })
    const cls1 = differentCss({ ':hover': cls })
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('composition stuff', () => {
    const cls1 = differentCss({ justifyContent: 'center' })
    const cls2 = differentCss([cls1])
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
    const tree2 = renderer.create(<div className={cls2} />).toJSON()
    expect(tree2).toMatchSnapshot()
  })
  test('nested selector without parent declaration', () => {
    const cls1 = differentCss`
      color: blue;
    `
    const cls2 = differentCss`
      & .${cls1} {
        color: red;
      }
    `
    const tree = renderer
      .create(
        <div className={cls2}>
          <div className={cls1} />
        </div>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('null rule', () => {
    const cls1 = differentCss()

    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test('css variables', () => {
    const cls1 = differentCss`
      --some-var: 1px;
      width: var(--some-var);
    `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('null value', () => {
    const cls1 = differentCss(null)
    const cls2 = differentCss`
      ${null};
    `
    expect(renderer.create(<div className={cls1} />).toJSON()).toMatchSnapshot()
    expect(renderer.create(<div className={cls2} />).toJSON()).toMatchSnapshot()
  })

  test('flushes correctly', () => {
    const cls1 = differentCss`
      display: flex;
    `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
    flush()
    const tree2 = renderer.create(<div className={cls1} />).toJSON()
    expect(tree2).toMatchSnapshot()
  })
  test('media query specificity', () => {
    flush()
    const cls = differentCss`
      width: 32px;
      height: 32px;
      border-radius: 50%;

      @media (min-width: 420px) {
        width: 96px;
        height: 96px;
      }
    `

    const tree = renderer.create(<div className={cls} />).toJSON()
    expect(sheet).toMatchSnapshot()
    expect(tree).toMatchSnapshot()
    flush()
  })
  test('weakmap', () => {
    const styles = { display: 'flex' }
    const cls1 = differentCss(styles)
    const cls2 = differentCss(styles)
    const tree1 = renderer.create(<div className={cls1} />).toJSON()
    expect(tree1).toMatchSnapshot()
    const tree2 = renderer.create(<div className={cls2} />).toJSON()
    expect(tree2).toMatchSnapshot()
  })

  test('manually use label property', () => {
    flush()
    const cls1 = differentCss`
      color: hotpink;
      label: wow;
    `
    const tree = renderer.create(<div className={cls1} />).toJSON()
    expect(tree).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
  test('sets correct nonce value', () => {
    flush()
    differentCss`
      color: hotpink;
    `
    differentCss`
      color: yellow;
    `
    expect(sheet.tags).toHaveLength(2)

    expect(sheet.tags[0].getAttribute('nonce')).toBe('some-nonce')
    expect(sheet.tags[1].getAttribute('nonce')).toBe('some-nonce')
  })
})
