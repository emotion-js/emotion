/* eslint-disable no-template-curly-in-string */
/* eslint-env jest */
import * as babel from 'babel-core'

describe('babel macro', () => {
  describe('styled', () => {
    test('tagged template literal member', () => {
      const basic = `
        import { styled } from '../../src/macro'
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
        import { styled } from '../../src/macro'
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
  })
})
