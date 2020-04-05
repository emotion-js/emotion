const path = require('path')
const j = require('jscodeshift')
const rollup = require('rollup')

const stylisPath = path.join(__dirname, 'stylis.js')

const changeRuleInsertionTarget = src => {
  let changed = 0
  const output = j(src)
    .find(j.CallExpression, {
      callee: { name: 'append' },
      arguments: { 1: { name: 'rulesets' } }
    })
    .forEach(path => {
      changed++
      j(path).replaceWith(
        j.callExpression(path.value.callee, [
          path.value.arguments[0],
          j.identifier('declarations')
        ])
      )
    })
    .toSource()

  if (changed !== 1) {
    throw new Error(
      `Expected to find appending to rulesets once, but found it ${changed} times.`
    )
  }

  return output
}
;(async () => {
  const bundle = await rollup.rollup({
    input: __filename,
    plugins: [
      {
        resolveId(id) {
          switch (id) {
            case __filename:
              return '\0entry.js'
            default:
              return id
          }
        },
        load(id) {
          switch (id) {
            case '\0entry.js':
              return {
                code: `import {compile} from '${stylisPath}'\nexport default compile`
              }
          }
        },
        renderChunk(code) {
          return {
            code: changeRuleInsertionTarget(code)
          }
        }
      }
    ],
    treeshake: {
      propertyReadSideEffects: false
    }
  })

  await bundle.write({ format: 'esm', file: './src/forked-stylis.js' })

  console.log('done')
})()
