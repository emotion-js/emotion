import * as babel from 'babel-core'
import plugin from 'babel-plugin-emotion'
import { createInline } from './util'
import * as fs from 'fs'

jest.mock('fs')

fs.existsSync.mockReturnValue(true)
fs.statSync.mockReturnValue({ isFile: () => false })

const inline = {
  'basic inline': {
    code: '(<div className="a" css={`color: brown;`}></div>)'
  },

  'basic object': {
    code: '(<div className="a" css={{ color: \'brown\' }}></div>)'
  },

  'dynamic inline': {
    code: `(<div className="a" css={\`color: $\{color};\`}></div>)`
  },

  'no css attr': {
    code: '(<div></div>)'
  },

  'with spread arg in jsx opening tag': {
    code: '(<div className="a" css={`color: brown;`} {...rest}></div>)'
  },

  'css empty': {
    code: '(<div css=""></div>)'
  },

  'StringLiteral css prop value': {
    code: `<div css="color: brown;"></div>`
  },

  noClassName: {
    code: '(<div css={`color: brown;`}></div>)'
  },

  emptyClassName: {
    code: '(<div className="" css={`color: brown;`}></div>)'
  },

  'className as expression': {
    code: '(<div className={variable} css={`color: brown;`}></div>)'
  },

  'className as expression string': {
    code:
      '(<div className={`test__class`} css={`color: brown;`} this={`hello`}></div>)'
  },

  'no import css prop': {
    code: '(<div className={`test__class`} css={`color: brown;`}></div>)',
    opts: { autoImportCssProp: false }
  },

  'redefined-import: basic inline': {
    code: '(<div className="a" cows={`color: brown;`}></div>)',
    opts: { importedNames: { css: 'cows' } }
  },

  'hoisting object styles': {
    code:
      'const Profile = () => ' +
      '(<div className="a" css={{ color: \'brown\' }}></div>)',

    opts: { hoist: true }
  },

  'hoisting string styles': {
    code:
      'const Profile = () => {' +
      'const color = "blue";\n' +
      '(<div css={`color: ${color}`}></div>)' +
      '\n}',

    opts: { hoist: true }
  }
}

createInline('babel css prop', inline)

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
})
