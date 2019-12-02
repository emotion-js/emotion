// @flow
import 'test-utils/legacy-env'
import { injectGlobal, sheet, flush, css } from 'emotion'

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
    const cls = css`
      display: flex;
    `
    injectGlobal`
      body {
        ${cls};
      }
    `
    expect(sheet).toMatchSnapshot()
  })
  test('with @font-face', () => {
    injectGlobal`
      @font-face {
        font-family: 'Patrick Hand SC';
        font-style: normal;
        font-weight: 400;
        src: local('Patrick Hand SC'), local('PatrickHandSC-Regular'),
          url(https://fonts.gstatic.com/s/patrickhandsc/v4/OYFWCgfCR-7uHIovjUZXsZ71Uis0Qeb9Gqo8IZV7ckE.woff2)
            format('woff2');
        unicode-range: U+0100-024f, U+1-1eff, U+20a0-20ab, U+20ad-20cf,
          U+2c60-2c7f, U+A720-A7FF;
      }
    `
    expect(sheet).toMatchSnapshot()
  })
})
