// @flow
import cases from 'jest-in-case'
import * as babel from '@babel/core'
import plugin from '../add-basic-constructor-to-react-component'

const separator = '\n\n      ↓ ↓ ↓ ↓ ↓ ↓\n\n'

cases(
  'add-basic-constructor-to-react-component',
  opts => {
    const { code } = babel.transformSync(opts.code, {
      plugins: [
        plugin,
        ['@babel/plugin-proposal-class-properties', { loose: true }]
      ],
      babelrc: false,
      filename: __filename
    })
    expect(`${opts.code}${separator}${code}`).toMatchSnapshot()
  },
  {
    basic: {
      code: `
      class Thing extends React.Component {
        thing = true;
      }`
    },
    'does not modify if there is already a constructor': {
      code: `class Thing2 extends React.Component {
        constructor(props, otherThing) {
          super(props, otherThing);
        }
        ok = true;
      }`
    },
    'does not modify other non react components': {
      code: `      class Thing3 {
            ok = true;
          }
          class Thing4 extends Thing3 {
            ok = true;
          }
          class Thing5 extends Thing3.OtherThing {
            ok = true;
          }`
    }
  }
)
