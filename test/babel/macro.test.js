/* eslint-disable no-template-curly-in-string */
/* eslint-env jest */
import * as babel from 'babel-core'

describe('babel macro', () => {
  describe('styled', () => {
    test('tagged template literal member', () => {
      const basic = `
        import styled from '../../src/react/macro'
        const SomeComponent = styled.div\`
          display: flex;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('tagged template literal function', () => {
      const basic = `
        import styled from '../../src/react/macro'
        const SomeComponent = styled('div')\`
          display: flex;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('object member', () => {
      const basic = `
      import styled from '../../src/react/macro'
      const SomeComponent = styled.div({
        display: 'flex'
      })
    `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test('object function', () => {
      const basic = `
      import styled from '../../src/react/macro'
      const SomeComponent = styled('div')({
        display: 'flex'
      })
    `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
    test.skip('tagged template literal member require commonjs', () => {
      const basic = `
        const styled = require('../../src/react/macro')
        const SomeComponent = styled.div\`
          display: flex;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: ['babel-macros'],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
    })
  })
  test('injectGlobal', () => {
    const basic = `
    import { injectGlobal } from '../../src/macro'
    injectGlobal\`
      body {
        margin: 0;
        padding: 0;
        & > div {
          display: none;
        }
      }
      html {
        background: green;
      }
  \`;`
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('fontFace', () => {
    const basic = `
    import { fontFace } from '../../src/macro'
    fontFace\`
    font-family: MyHelvetica;
    src: local("Helvetica Neue Bold"),
         local("HelveticaNeue-Bold"),
         url(MgOpenModernaBold.ttf);
    font-weight: bold;
    \`;`
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
  test('css', () => {
    const basic = `
    import { css } from '../../src/macro'
    css\`
      margin: 12px 48px;
      color: #ffffff;
      display: flex;
      flex: 1 0 auto;
      color: blue;
      width: \${widthVar};
  \``
    const { code } = babel.transform(basic, {
      plugins: ['babel-macros'],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
  })
})
