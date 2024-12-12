import 'test-utils/setup-env'
import React from 'react'
import { act } from 'react'
import { render } from '@testing-library/react'
import { css as differentCss, flush, sheet } from './emotion-instance'

describe('css', () => {
  test('float property', async () => {
    const cls1 = differentCss`
      float: left;
    `

    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('handles more than 10 dynamic properties', async () => {
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

    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('falsy value in nested selector on object', async () => {
    const cls1 = differentCss({ ':hover': { display: null, color: 'hotpink' } })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('boolean as value', async () => {
    const cls1 = differentCss({
      display: 'flex',
      color: false,
      backgroundColor: true
    })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('auto px', async () => {
    const cls1 = differentCss({ display: 'flex', flex: 1, fontSize: 10 })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('random interpolation with undefined values', async () => {
    const cls2 = differentCss`
      ${undefined};
      justify-content: center;
    `
    const { container } = render(<div className={cls2} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('random expression', async () => {
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
    const { container } = render(<div className={cls2} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('simple composition', async () => {
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
    const { container } = render(<div className={cls2} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('handles objects', async () => {
    const cls1 = differentCss({
      float: 'left',
      display: 'flex',
      color: `${'blue'}`,
      fontSize: `${'20px'}`,
      height: 50,
      width: 20
    })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('handles array of objects', async () => {
    const cls1 = differentCss([{ height: 50, width: 20 }, null])
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('computed key is only dynamic', async () => {
    const cls1 = differentCss({ fontSize: 10, [`w${'idth'}`]: 20 })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('composition with objects', async () => {
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

    const { container } = render(<div className={cls2} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('@supports', async () => {
    const cls1 = differentCss`
      @supports (display: grid) {
        display: grid;
      }
    `
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test.skip('nested at rules', async () => {
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
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('nested array', async () => {
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
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('explicit false', async () => {
    const cls1 = differentCss(false)
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('array with explicit false', async () => {
    const cls1 = differentCss([[{ display: 'flex' }], false])
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('array with explicit true', async () => {
    const cls1 = differentCss([[{ display: 'flex' }], true])
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('nested', async () => {
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
    const { container } = render(
      <div className={cls1}>
        <div className="some-class">
          <div className="some-other-class" />
        </div>
      </div>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
  test('explicit &', async () => {
    flush()
    const cls1 = differentCss`
      &.another-class {
        display: flex;
      }
    `
    const { container } = render(<div className={`${cls1} another-class`} />)

    expect(container.firstChild).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
    flush()
  })
  test('falsy property value in object', async () => {
    const cls = differentCss({ display: 'flex', backgroundColor: undefined })
    const { container } = render(<div className={cls} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('registered styles as nested selector value in object', async () => {
    const cls = differentCss({ display: 'flex', backgroundColor: 'hotpink' })
    const cls1 = differentCss({ ':hover': cls })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('composition stuff', async () => {
    const cls1 = differentCss({ justifyContent: 'center' })
    const cls2 = differentCss([cls1])
    const { container: container1 } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
    const { container: container2 } = render(<div className={cls2} />)
    expect(container2.firstChild).toMatchSnapshot()
  })
  test('null rule', async () => {
    const cls1 = differentCss()

    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('css variables', async () => {
    const cls1 = differentCss`
      --some-var: 1px;
      width: var(--some-var);
    `
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('null value', async () => {
    const cls1 = differentCss(null)
    const cls2 = differentCss`
      ${null};
    `
    expect(
      render(<div className={cls1} />).container.firstChild
    ).toMatchSnapshot()
    expect(
      render(<div className={cls2} />).container.firstChild
    ).toMatchSnapshot()
  })

  test('flushes correctly', async () => {
    const cls1 = differentCss`
      display: flex;
    `
    const { container: container1 } = render(<div className={cls1} />)
    expect(container1.firstChild).toMatchSnapshot()
    flush()
    const { container: container2 } = render(<div className={cls1} />)
    expect(container2.firstChild).toMatchSnapshot()
  })
  test('media query specificity', async () => {
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

    const { container } = render(<div className={cls} />)
    expect(sheet).toMatchSnapshot()
    expect(container.firstChild).toMatchSnapshot()
    flush()
  })
  test('weakmap', async () => {
    const styles = { display: 'flex' }
    const cls1 = differentCss(styles)
    const cls2 = differentCss(styles)
    const { container: container1 } = render(<div className={cls1} />)
    expect(container1.firstChild).toMatchSnapshot()
    const { container: container2 } = render(<div className={cls2} />)
    expect(container2.firstChild).toMatchSnapshot()
  })

  test('manually use label property', async () => {
    flush()
    const cls1 = differentCss`
      color: hotpink;
      label: wow;
    `
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
  test('sets correct nonce value', async () => {
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
