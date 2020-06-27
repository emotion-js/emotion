import 'test-utils/legacy-env'
import { css, sheet, flush } from '@emotion/css'

const commentPattern = /\/\*[\s\S]*?\*\//g
const getStyles = sheet =>
  sheet.tags
    .map(tag => tag.textContent || '')
    .join('')
    .replace(commentPattern, '\n$&\n')

describe('css', () => {
  afterEach(() => flush())
  test('source-map nested styles', () => {
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
    expect(getStyles(sheet)).toMatchSnapshot()
  })

  test('source-map nested media queries', () => {
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

    expect(getStyles(sheet)).toMatchSnapshot()
  })
  test('css without newline or semicolon', () => {
    // eslint-disable-next-line
    const cls = css`
      color: hotpink;
    `
    expect(getStyles(sheet)).toMatchSnapshot()
  })
})
