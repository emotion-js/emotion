/* eslint-env jest */
import * as babel from 'babel-core'
import plugin from '../../src/babel'
import * as fs from 'fs'
jest.mock('fs')

fs.existsSync.mockReturnValue(true)

describe('babel css', () => {
  describe('inline', () => {
    test('css basic', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
        width: \${widthVar};
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('interpolation in selector', () => {
      const basic = `
        const cls2 = css\`
        margin: 12px 48px;
        color: #ffffff;
        .\${className} {
          display: none;
        }
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('composes', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: \${'one-class'} \${'another-class'}\${cls1}
          justify-content: center;
          align-items: \${'center'}
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('lots of composes', () => {
      const basic = `
        const cls2 = css\`
          composes: \${'one-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'} \${'another-class'};
          justify-content: center;
          align-items: \${'center'}
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('only composes', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: \${'one-class'} \${'another-class'}\${cls1}
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('only styles on nested selector', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          &:hover {
            background: pink;
          }
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('throws correct error when composes is not the first rule', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          justify-content: center;
          composes: \${['one-class', 'another-class', cls1]}
          align-items: \${'center'}
        \`
      `
      expect(() =>
        babel.transform(basic, {
          plugins: [[plugin]]
        })
      ).toThrowErrorMatchingSnapshot()
    })
    test('throws correct error when the value of composes is not an interpolation', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: some-class;
          justify-content: center;
          align-items: \${'center'}
        \`
      `
      expect(() =>
        babel.transform(basic, {
          plugins: [[plugin]]
        })
      ).toThrowErrorMatchingSnapshot()
    })
    test('throws correct error when composes is on a nested selector', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          justify-content: center;
          align-items: center;
          .some-class {
            composes: \${cls1}
          }
        \`
      `
      expect(() =>
        babel.transform(basic, {
          plugins: [[plugin]]
        })
      ).toThrowErrorMatchingSnapshot()
    })
  })
  describe('extract', () => {
    test('css basic', () => {
      const basic = `
        css\`
        margin: 12px 48px;
        color: #ffffff;
        display: flex;
        flex: 1 0 auto;
        color: blue;
        width: \${widthVar};
      \``
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
      expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
    })

    test('interpolation in selector', () => {
      const basic = `
        const cls2 = css\`
        margin: 12px 48px;
        color: #ffffff;
        .\${className} {
          display: none;
        }
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
    })

    test('composes', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: \${['one-class', 'another-class', cls1]}
          justify-content: center;
          align-items: \${'center'}
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(2)
      expect(fs.writeFileSync.mock.calls[1][1]).toMatchSnapshot()
    })
    test('composes no dynamic', () => {
      const basic = `
        const cls1 = css\`
          display: flex;
        \`
        const cls2 = css\`
          composes: \${'one-class'} \${'another-class'}\${cls1}
          justify-content: center;
          align-items: center
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })
      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(3)
      expect(fs.writeFileSync.mock.calls[2][1]).toMatchSnapshot()
    })

    test('basic object support', () => {
      const basic = `css({display: 'flex'})`
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('prefixed objects', () => {
      const basic = `
          css({
            borderRadius: '50%',
            transition: 'transform 400ms ease-in-out',
            boxSizing: 'border-box',
            display: 'flex',
            ':hover': {
                transform: 'scale(1.2)'
            }
        })
   `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('prefixed array of objects', () => {
      const basic = `
          css([{
            borderRadius: '50%',
            boxSizing: 'border-box',
            display: 'flex',
            ':hover': {
              transform: 'scale(1.2)'
            }
        }, {
          transition: 'transform 400ms ease-in-out',
        }])
    `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]]
      })
      expect(code).toMatchSnapshot()
    })

    test('composes with objects', () => {
      const basic = `
        const cls1 = css({display: 'flex'})
        const cls2 = css\`
          composes: $\{cls1};
          height: 20;
          justifyContent: center;
        \`
      `
      const { code } = babel.transform(basic, {
        plugins: [[plugin]],
        filename: __filename,
        babelrc: false
      })

      expect(code).toMatchSnapshot()
      expect(fs.writeFileSync).toHaveBeenCalledTimes(4)
      expect(fs.writeFileSync.mock.calls[3][1]).toMatchSnapshot()
    })
  })
})
