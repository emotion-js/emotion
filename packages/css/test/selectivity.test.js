import 'test-utils/setup-env'
import { css, sheet, flush } from '@emotion/css'

describe('css', () => {
  afterEach(() => flush())

  test('complex nested styles', () => {
    const mq = [
      '@media(min-width: 420px)',
      '@media(min-width: 640px)',
      '@media(min-width: 960px)'
    ]

    css({
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
    expect(sheet).toMatchSnapshot()
  })

  test('complex nested media queries', () => {
    css`
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

    expect(sheet).toMatchSnapshot()
  })

  test('handles media query merges', () => {
    const mq = [
      '@media(min-width: 420px)',
      '@media(min-width: 640px)',
      '@media(min-width: 960px)'
    ]
    const buttonCSS = [
      { color: 'red', [mq[1]]: { color: 'blue' } },
      { color: 'purple', [mq[1]]: { color: 'aquamarine' } }
    ]
    css([
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
    expect(sheet).toMatchSnapshot()
  })
  test('media queries with multiple nested selectors', () => {
    css`
      color: blue;

      @media (max-width: 400px) {
        color: green;
        h1 {
          color: red;
        }
        span {
          color: red;
        }
      }
    `

    expect(sheet).toMatchSnapshot()
  })
  test('media query with nested selector without declarations on root', () => {
    css`
      @media (max-width: 400px) {
        color: green;
        span {
          color: red;
        }
      }
    `
    expect(sheet).toMatchSnapshot()
  })
  test('media query with nested selector with nested selector on root', () => {
    css`
      span {
        color: blue;
      }
      @media (max-width: 400px) {
        color: green;
        span {
          color: red;
        }
      }
    `
    expect(sheet).toMatchSnapshot()
  })

  // this isn't compatible with SCSS but is allowed in Stylis
  test('should allow for context selector being appended to an element type', () => {
    css`
      a& {
        background: blue;
      }
    `
    expect(sheet).toMatchSnapshot()
  })

  // #2488
  test('should allow for context selector being appended to an element type when pseudoclass appears in the selector group', () => {
    css`
      &:hover,
      a& {
        background: blue;
      }
    `
    expect(sheet).toMatchSnapshot()
  })

  test('should allow a weird class containing & when pseudoclass appears in the selector group', () => {
    css`
      &:hover,
      .t\\&t {
        background: blue;
      }
    `
    expect(sheet).toMatchSnapshot()
  })
})
