import prettyCSS from './pretty-css'
import { injectGlobal, sheet, flush, css } from 'emotion'

expect.addSnapshotSerializer(prettyCSS)

describe('injectGlobal', () => {
  afterEach(() => {
    flush()
  })
  test('basic', () => {
    injectGlobal`
      html {
        background: pink;
      }
      html.active {
        background: red;
      }
    `
    expect(sheet).toMatchSnapshot()
  })
  test('interpolated value', () => {
    const color = 'yellow'
    injectGlobal`
      body {
        color: ${color};
        margin: 0;
        padding: 0;
      }
    `
    expect(sheet).toMatchSnapshot()
  })
  test('nested interpolated media query', () => {
    injectGlobal`
      body {
        ${'@media (max-width: 600px)'} {
          display: flex;
        }
      }
    `
    expect(sheet).toMatchSnapshot()
  })
  test('random interpolation', () => {
    const cls = css`display: flex;`
    injectGlobal`
      body {
        ${cls};
      }
    `
    expect(sheet).toMatchSnapshot()
  })
})
