// @flow
import 'test-utils/legacy-env'
import { css, sheet, flush } from '@emotion/css'

describe('css', () => {
  afterEach(() => flush())

  test('complex nested styles', () => {
    const mq = [
      '@media(min-width: 420px)',
      '@media(min-width: 640px)',
      '@media(min-width: 960px)',
    ]

    css({
      color: 'blue',
      '&:hover': {
        '& .name': {
          color: 'amethyst',
          '&:focus': {
            color: 'burlywood',
            [mq[0]]: {
              color: 'rebeccapurple',
            },
          },
        },
        color: 'green',
      },
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
      '@media(min-width: 960px)',
    ]
    const buttonCSS = [
      { color: 'red', [mq[1]]: { color: 'blue' } },
      { color: 'purple', [mq[1]]: { color: 'aquamarine' } },
    ]
    css([
      {
        color: 'darkslateblue',
        [mq[0]]: {
          color: 'amethyst',
        },
        [mq[1]]: {
          color: 'rebeccapurple',
        },
        [mq[2]]: {
          color: 'burlywood',
        },
      },
      buttonCSS,
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
})

describe('orphaned pseudos', () => {
  afterEach(() => flush())

  test('single', () => {
    css`
      :focus {
        color: hotpink;
      }
    `

    expect(sheet).toMatchSnapshot()
  })

  test('multiple in a group', () => {
    css`
      :hover div,
      :focus {
        color: hotpink;
      }
    `

    expect(sheet).toMatchSnapshot()
  })

  test('multiple in a group in multiple in a group', () => {
    css`
      .foo,
      .bar div,
      .qwe {
        :first-child,
        div,
        span,
        :last-child {
          color: hotpink;
        }
      }
    `

    expect(sheet).toMatchSnapshot()
  })

  test('regexp special character', () => {
    css`
      :nth-child(3) {
        color: hotpink;
      }
    `

    expect(sheet).toMatchSnapshot()
  })

  test('overlapping', () => {
    css`
      & :first-child {
        :first-child {
          color: hotpink;
        }
      }
    `

    expect(sheet).toMatchSnapshot()
  })

  test('overlapping - reversed', () => {
    css`
      & :first-child {
        :first-child & {
          color: hotpink;
        }
      }
    `

    expect(sheet).toMatchSnapshot()
  })

  test('in nested atrules', () => {
    css`
      @media (max-width: 400px) {
        @supports (display: grid) {
          div,
          :first-child {
            color: hotpink;
          }
        }
      }
    `

    expect(sheet).toMatchSnapshot()
  })

  test('with nested atrule', () => {
    css({
      '::before': {
        content: '"*"',
        background: 'pink',
        '@media screen and (max-width: 800px)': {
          background: 'cyan',
        },
      },
    })

    expect(sheet).toMatchSnapshot()
  })

  test('selector list with nested atrule', () => {
    css({
      '::backdrop, & + .backdrop': {
        backgroundColor: 'grey',
        '@media print': {
          display: 'none',
        },
      },
    })

    expect(sheet).toMatchSnapshot()
  })

  test('regular rule nested in orphaned pseudo', () => {
    css({
      ':hover': {
        color: 'hotpink',
        '.foo': {
          color: 'grey',
        },
      },
    })

    expect(sheet).toMatchSnapshot()
  })

  test('regular rule with nested rule nested in orphaned pseudo', () => {
    css({
      ':hover': {
        color: 'hotpink',
        '.foo': {
          color: 'grey',
          '@media print': {
            display: 'none',
          },
        },
      },
    })

    expect(sheet).toMatchSnapshot()
  })

  test('orphaned pseudo nested in orphaned pseudo', () => {
    css({
      ':hover': {
        color: 'hotpink',
        ':focus': {
          outlineColor: 'blue',
        },
      },
    })

    expect(sheet).toMatchSnapshot()
  })
})
