import * as babel from 'babel-core'
import plugin from '../../src/babel'
import * as fs from 'fs'

jest.mock('fs')

fs.existsSync.mockReturnValue(true)

describe('babel css prop', () => {
  test('basic with extractStatic', () => {
    const basic = '(<div className="a" css={`color: brown;`}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [[plugin, { extractStatic: true }]],
      filename: __filename,
      babelrc: false
    })
    expect(code).toMatchSnapshot()
    expect(fs.writeFileSync).toHaveBeenCalledTimes(1)
    expect(fs.writeFileSync.mock.calls[0][1]).toMatchSnapshot()
  })

  test('basic inline', () => {
    const basic = '(<div className="a" css={`color: brown;`}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('basic object', () => {
    const basic = '(<div className="a" css={{ color: \'brown\' }}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('dynamic inline', () => {
    const basic = `(<div className="a" css={\`color: $\{color};\`}></div>)`
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('no css attr', () => {
    const basic = '(<div></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('with spread arg in jsx opening tag', () => {
    const basic = '(<div className="a" css={`color: brown;`} {...rest}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('css empty', () => {
    const basic = '(<div css=""></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('StringLiteral css prop value', () => {
    const basic = `<div css="color: brown;"></div>`
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('noClassName', () => {
    const basic = '(<div css={`color: brown;`}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('emptyClassName', () => {
    const basic = '(<div className="" css={`color: brown;`}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('className as expression', () => {
    const basic = '(<div className={variable} css={`color: brown;`}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('className as expression string', () => {
    const basic =
      '(<div className={`test__class`} css={`color: brown;`} this={`hello`}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [plugin]
    })
    expect(code).toMatchSnapshot()
  })

  test('no import css prop', () => {
    const basic =
      '(<div className={`test__class`} css={`color: brown;`}></div>)'
    const { code } = babel.transform(basic, {
      plugins: [[plugin, { autoImportCssProp: false }]]
    })
    expect(code).toMatchSnapshot()
  })
})
