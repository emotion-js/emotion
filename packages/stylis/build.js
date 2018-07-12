// this whole thing is a really fragile hack
// but it works so ¯\_(ツ)_/¯

const stylisPath = require.resolve('stylis')
const { promisify } = require('util')
const j = require('jscodeshift')
const request = require('request-promise-native')
const fs = require('fs')
const babylon = require('babylon')
const prettier = require('prettier')
const recast = require('recast')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const removeUselessThingForQuotes = src =>
  j(src)
    .find(j.SwitchStatement, {
      discriminant: {
        name: 'code'
      }
    })
    .forEach(path => {
      path.value.cases.forEach(_case => {
        if (
          _case.test &&
          _case.test.type === 'Identifier' &&
          _case.test.name === 'DOUBLEQUOTE'
        ) {
          _case.consequent = []
        }
      })
    })
    .toSource()

const removeUselessCasesInProxy = src =>
  j(src)
    .find(j.FunctionDeclaration, { id: { name: 'proxy' } })
    .forEach(path => {
      path.value.body.body[1] = recast.parse(`
      if (out !== content) {
        return out
      }
      `).program.body[0]
    })
    .toSource()

const simplifySet = src =>
  j(src)
    .find(j.FunctionDeclaration, { id: { name: 'set' } })
    .forEach(path => {
      j(path).replaceWith(
        recast.parse(`function set(options) {
        var prefixOpt = options.prefix
        if (prefixOpt!==undefined) {
          should = null

					if (!prefixOpt) {
						prefix = 0
					} else if (typeof prefixOpt !== 'function') {
						prefix = 1
					} else {
						prefix = 2
						should = prefixOpt
					}
        }
        return set
      }`).program.body[0]
      )
    })
    .toSource()

const removeOptions = src =>
  j(src)
    .find(j.SwitchStatement)
    .forEach(thing => {
      thing.value.cases = thing.value.cases.filter(node => {
        if (!node.test) return true
        switch (node.test.value) {
          case 'keyframe':
          case 'cascade':
          case 'preserve':
          case 'semicolon':
          case 'compress':
          case 'global': {
            return false
          }
          default: {
            return true
          }
        }
      })
    })
    .toSource()

const setOptions = src =>
  j(src)
    .find(j.VariableDeclarator)
    .forEach(path => {
      switch (path.value.id.name) {
        case 'escape':
        case 'keyed': {
          path.value.init.value = 0
          return
        }
        case 'semicolon': {
          path.value.init.value = 1
        }
      }
    })
    .toSource()

const removeUMDWrapper = src =>
  j(src)
    .find(j.Program)
    .forEach(thing => {
      delete thing.value.body[1]
    })
    .toSource()

async function doThing() {
  const stylisSrc = (await readFile(stylisPath))
    .toString()
    .replace(
      'cascade + quote + bracket + atrule === 0 && id !== KEYFRAME && code !== SEMICOLON',
      'true === false'
    )
    .replace(
      'comment + quote + parentheses + bracket + semicolon === 0',
      'true === false'
    )
    .replace('(insert === 1)', '(true === false)')
    .replace('input.charCodeAt(9)*keyed', '0')
    .replace('switch (cascade + level) {', 'switch (2) {')
    .replace('compress*code === 0', 'true')
    .replace(`typeof(output = result) !== 'string'`, '(output = result)')

  // .replace("stylis['set'] = set", '')
  // .replace('options !== void 0', 'false')
  // .replace('this !== void 0 && this.constructor === stylis', 'false')
  const result = simplifySet(
    removeUselessCasesInProxy(
      removeUselessThingForQuotes(setOptions(removeOptions(stylisSrc)))
    )
  )
  // await writeFile('./src/stylis.js', result)
  console.log('start request')
  const data = (await request('https://closure-compiler.appspot.com/compile', {
    method: 'POST',
    form: {
      js_code: result,
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
      output_format: 'text',
      output_info: 'compiled_code'
    }
  })).toString()
  const srcWithoutUMDWrapper = removeUMDWrapper(data)
  console.log(srcWithoutUMDWrapper)
  let ast = babylon.parse(srcWithoutUMDWrapper).program.body[0]
  const finalSrc =
    srcWithoutUMDWrapper +
    '\nexport default ' +
    (ast.declarations ? ast.declarations[0].id.name : ast.id.name)
  await writeFile('./src/stylis.min.js', prettier.format(finalSrc))

  console.log('done')
}

doThing()
