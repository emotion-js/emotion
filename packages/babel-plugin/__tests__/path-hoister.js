import * as babel from '@babel/core'
import checkDuplicatedNodes from 'babel-check-duplicated-nodes'
import { hoistPath } from '../src/utils/path-hoister'

const fixtures = [
  `hoistMe({ color: 'hotpink' })`,
  `const make = () => hoistMe({ color: 'hotpink' })`,
  `const make = color => hoistMe({ color })`,
  `const make = () => hoistMe({ c }); var c = 1`,
  `const make = () => hoistMe({ c }); var c = 1; c = 2`,
  `let c = 'x'; function reassign() { c = 'y' } const make = () => hoistMe({ c })`,
  `function outer(c) { const inner = () => hoistMe({ c }); return inner }`,
  `function outer(a) { { const inner = hoistMe({ a }) } }`,
  `class Foo { style = hoistMe({ color: 'hotpink' }) }`
]

const transformWith = hoist =>
  fixtures.map(fixture => {
    const { code, ast } = babel.transformSync(fixture, {
      plugins: [
        {
          visitor: {
            CallExpression(path) {
              if (path.node.callee.name === 'hoistMe') hoist(path)
            }
          }
        }
      ],
      ast: true,
      babelrc: false,
      configFile: false
    })
    expect(() => checkDuplicatedNodes(babel, ast)).not.toThrow()
    return code
  })

// `hoistPath` is a copy of `path.hoist` which has been removed in Babel 8,
// both have to produce the same output for the same input
test('hoistPath produces the same output as path.hoist', () => {
  expect(transformWith(path => hoistPath(path, babel.types))).toEqual(
    transformWith(path => path.hoist())
  )
})
