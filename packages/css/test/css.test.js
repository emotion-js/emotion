import 'test-utils/setup-env'
import React from 'react'
import { render } from '@testing-library/react'
import { css, flush, sheet } from '@emotion/css'

describe('css', () => {
  test('float property', () => {
    const cls1 = css`
      float: left;
    `

    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
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

    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('falsy value in nested selector on object', () => {
    const cls1 = css({ '&:hover': { display: null, color: 'hotpink' } })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('boolean as value', () => {
    const cls1 = css({ display: 'flex', color: false, backgroundColor: true })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('auto px', () => {
    const cls1 = css({ display: 'flex', flex: 1, fontSize: 10, '--custom': 5 })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('random interpolation with undefined values', () => {
    const cls2 = css`
      ${undefined};
      justify-content: center;
    `
    const { container } = render(<div className={cls2} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('random expression', () => {
    const cls2 = css`
      font-size: 20px;
      @media (min-width: 420px) {
        color: blue;
        ${css`
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

  test('simple composition', () => {
    const cls1 = css`
      display: flex;
      &:hover {
        color: hotpink;
      }
    `
    const cls2 = css`
      ${cls1};
      justify-content: center;
    `
    const { container } = render(<div className={cls2} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('handles objects', () => {
    const cls1 = css({
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

  test('handles array of objects', () => {
    const cls1 = css([{ height: 50, width: 20 }, null])
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('computed key is only dynamic', () => {
    const cls1 = css({ fontSize: 10, [`w${'idth'}`]: 20 })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('composition with objects', () => {
    const cls1 = css({
      display: 'flex',
      width: 30,
      height: 'calc(40vw - 50px)',
      '&:hover': { color: 'blue' },
      '&:after': {
        content: '" "',
        color: 'red'
      },
      '@media(min-width: 420px)': {
        color: 'green'
      }
    })
    const cls2 = css`
      ${cls1};
      justify-content: center;
    `

    const { container } = render(<div className={cls2} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('@supports', () => {
    const cls1 = css`
      @supports (display: grid) {
        display: grid;
      }
    `
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
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
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('nested array', () => {
    const cls1 = css([
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

  test('explicit false', () => {
    const cls1 = css(false)
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('array with explicit false', () => {
    const cls1 = css([[{ display: 'flex' }], false])
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('array with explicit true', () => {
    const cls1 = css([[{ display: 'flex' }], true])
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('nested', () => {
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
    const { container } = render(
      <div className={cls1}>
        <div className="some-class">
          <div className="some-other-class" />
        </div>
      </div>
    )
    expect(container.firstChild).toMatchSnapshot()
  })
  test('explicit &', () => {
    flush()
    const cls1 = css`
      &.another-class {
        display: flex;
      }
    `
    const { container } = render(<div className={`${cls1} another-class`} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
    flush()
  })
  test('falsy property value in object', () => {
    const cls = css({ display: 'flex', backgroundColor: undefined })
    const { container } = render(<div className={cls} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('registered styles as nested selector value in object', () => {
    const cls = css({ display: 'flex', backgroundColor: 'hotpink' })
    const cls1 = css({ '&:hover': cls })
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('composition stuff', () => {
    const cls1 = css({ justifyContent: 'center' })
    const cls2 = css([cls1])
    const { container: container1 } = render(<div className={cls1} />)
    expect(container1.firstChild).toMatchSnapshot()
    const { container: container2 } = render(<div className={cls2} />)
    expect(container2.firstChild).toMatchSnapshot()
  })
  test('null rule', () => {
    const cls1 = css()

    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('css variables', () => {
    const cls1 = css`
      --some-var: 1px;
      width: var(--some-var);
    `
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('null value', () => {
    const cls1 = css(null)

    expect(
      render(<div className={cls1} />).container.firstChild
    ).toMatchSnapshot()
  })

  test('flushes correctly', () => {
    const cls1 = css`
      display: flex;
    `
    const { container: container1 } = render(<div className={cls1} />)
    expect(container1.firstChild).toMatchSnapshot()
    flush()
    const { container: container2 } = render(<div className={cls1} />)
    expect(container2.firstChild).toMatchSnapshot()
  })
  test('media query specificity', () => {
    flush()
    const cls = css`
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
  test('weakmap', () => {
    const styles = { display: 'flex' }
    const cls1 = css(styles)
    const cls2 = css(styles)
    const { container: container1 } = render(<div className={cls1} />)
    expect(container1.firstChild).toMatchSnapshot()
    const { container: container2 } = render(<div className={cls2} />)
    expect(container2.firstChild).toMatchSnapshot()
  })

  test('manually use label property', () => {
    flush()
    const cls1 = css`
      color: hotpink;
      label: wow;
    `
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
    expect(sheet).toMatchSnapshot()
  })
  test('multiline declaration', () => {
    /* eslint-disable prettier/prettier */
    const cls1 = css`
      display: grid;
      grid:
        'AppBar' auto
        'Main' 1fr
        / 1fr;
    `
    /* eslint-enable prettier/prettier */

    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('multiline selector', () => {
    /* eslint-disable prettier/prettier */
    const cls1 = css`
      .my-class:hover .its-child {
        background: pink;
      }
    `
    /* eslint-enable prettier/prettier */

    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('rule after media query', () => {
    const cls1 = css`
      @media (min-width: 600px) {
        color: green;
      }
      &:hover {
        color: hotpink;
      }
    `
    const { container } = render(<div className={cls1} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('nested at rule', () => {
    const cls = css({
      '@media (min-width: 980px)': {
        backgroundColor: 'blue',
        '@supports (width: 100vw)': {
          backgroundColor: 'red'
        }
      }
    })
    // this works correctly but `css` doesn't print it correctly so the snapshot doesn't look correct
    const { container } = render(<div className={cls} />)
    expect(container.firstChild).toMatchSnapshot()
  })
  test('array fallback', () => {
    const cls = css({
      color: ['yellow', 'hotpink']
    })
    const { container } = render(<div className={cls} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
