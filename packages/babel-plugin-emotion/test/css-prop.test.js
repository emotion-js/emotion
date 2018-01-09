// @flow
import { createInlineTests, createExtractTests } from './util'
import { transform } from '@babel/core'

const inline = {
  'basic inline': {
    code: '(<div className="a" css={`color: brown;`}></div>)',
  },

  'basic object': {
    code: '(<div className="a" css={{ color: \'brown\' }}></div>)',
  },

  'dynamic inline': {
    code: `(<div className="a" css={\`color: $\{color};\`}></div>)`,
  },

  'no css attr': {
    code: '(<div></div>)',
  },

  'with spread arg in jsx opening tag': {
    code: '(<div className="a" css={`color: brown;`} {...rest}></div>)',
  },

  'css empty': {
    code: '(<div css=""></div>)',
  },

  'StringLiteral css prop value': {
    code: `<div css="color: brown;"></div>`,
  },

  noClassName: {
    code: '(<div css={`color: brown;`}></div>)',
  },

  emptyClassName: {
    code: '(<div className="" css={`color: brown;`}></div>)',
  },

  'className as expression': {
    code: '(<div className={variable} css={`color: brown;`}></div>)',
  },

  'className as expression string': {
    code:
      '(<div className={`test__class`} css={`color: brown;`} this={`hello`}></div>)',
  },

  'no import css prop': {
    code: '(<div className={`test__class`} css={`color: brown;`}></div>)',
    opts: { autoImportCssProp: false },
  },

  'redefined-import: basic inline': {
    code: '(<div className="a" cows={`color: brown;`}></div>)',
    opts: { importedNames: { css: 'cows' } },
  },

  'hoisting object styles': {
    code:
      'const Profile = () => ' +
      '(<div className="a" css={{ color: \'brown\' }}></div>)',

    opts: { hoist: true },
  },

  'hoisting string styles': {
    code:
      'const Profile = () => {' +
      'const color = "blue";\n' +
      '(<div css={`color: ${color}`}></div>)' +
      '\n}',

    opts: { hoist: true },
  },
  'label in stateless functional component': {
    code: `
      const SFC = () => {
        return <div css={\`color: brown;\`}>Hello</div>
      }
    `,
    opts: { autoLabel: true },
  },

  'label in class component': {
    code: `
      class ClsComp extends React.Component {
        render() {
          return <div css="foo">Hello</div>
        }
      }
    `,
    opts: { autoLabel: true },
  },

  'label in higher order component': {
    code: `
      const foo = (W) => class extends Component {
        render() {
          return <div css={\`color: brown;\`}>Hello</div>
        }
      }
    `,
    opts: { autoLabel: true },
  },
  'custom instance': {
    code: '(<div css={`color: brown;`}></div>)',
    opts: {
      primaryInstance: 'my-emotion-instance',
    },
    filename: __filename,
  },
  'relative custom instance': {
    code: '(<div css={`color: brown;`}></div>)',
    opts: {
      primaryInstance: './my-emotion-instance',
    },
    filename: __filename,
  },
  'another relative custom instance': {
    code: '(<div css={`color: brown;`}></div>)',
    opts: {
      primaryInstance: '../my-emotion-instance',
    },
    filename: __filename,
  },
}

createInlineTests('babel css prop inline', inline)

const extract = {
  'basic with extractStatic': {
    code: '(<div className="a" css={`color: brown;`}></div>)',
  },
}

createExtractTests('babel css prop extract', extract)

test('with module transformer in babel 7', () => {
  expect(
    transform(
      `
  import React, { Component } from 'react';
  
  export class Home extends Component {
    render() {
      return (
        <div>
          <div css="background: yellow;">yellow</div>
          <div css="background: pink;">pink</div>
        </div>
      );
    }
  }`,
      {
        plugins: [
          require('babel-plugin-emotion'),
          require('@babel/plugin-transform-modules-commonjs'),
        ],
      }
    ).code
  ).toMatchSnapshot()
})
