// checks that the plugin works with Babel 8, which removed `path.hoist()`
// (see https://github.com/emotion-js/emotion/issues/3386)
// Babel 8 is ESM-only and can't be loaded from the CommonJS-based Jest setup,
// so this runs on `node:test` instead (`yarn test:babel8`)

import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const [major, minor] = process.versions.node.split('.').map(Number)
const supportedByBabel8 =
  (major === 22 && minor >= 18) || (major === 24 && minor >= 11) || major > 24
if (!supportedByBabel8) {
  console.error(
    `Babel 8 requires Node.js ^22.18.0 || >=24.11.0, this is ${process.version}`
  )
  process.exit(1)
}

// `babel8` is an alias for @babel/core@^8.0.0, see the root package.json
const { transformAsync, version } = await import('babel8')
assert.match(version, /^8\./)

const require = createRequire(import.meta.url)
const babel7 = require('@babel/core')
const emotionPlugin = require('@emotion/babel-plugin')
const babelPluginMacros = require('babel-plugin-macros')

const filename = fileURLToPath(new URL('babel8-test.js', import.meta.url))

// Babel 7 and 8 print the same program with slightly different formatting
// (blank lines, redundant parentheses), so outputs are compared as ASTs
// with the formatting metadata stripped
const toComparableAst = code =>
  JSON.parse(
    JSON.stringify(
      babel7.parseSync(code, {
        filename,
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ['jsx'] }
      }).program,
      (key, value) =>
        ['loc', 'start', 'end', 'extra'].includes(key) ? undefined : value
    )
  )

async function transform(code, plugins = [[emotionPlugin, {}]]) {
  const options = {
    plugins,
    parserOpts: { plugins: ['jsx'] },
    filename,
    envName: 'development',
    babelrc: false,
    configFile: false
  }
  const result = await transformAsync(code, options)
  const babel7Result = babel7.transformSync(code, options)
  assert.deepStrictEqual(
    toComparableAst(result.code),
    toComparableAst(babel7Result.code)
  )
  return result.code
}

test('hoists a css template literal used in a css prop', async () => {
  const code = await transform(`
    import { css } from '@emotion/react'
    const SomeComponent = () => <div css={css\`color: hotpink;\`} />
  `)
  assert.match(code, /^var _ref =/m)
  assert.match(code, /css=\{_ref\}/)
  assert.match(code, /color:hotpink/)
})

test('hoists a css call used in Global styles', async () => {
  const code = await transform(`
    import { Global, css } from '@emotion/react'
    export default () => <Global styles={css\`body { margin: 0; }\`} />
  `)
  assert.match(code, /^var _ref =/m)
  assert.match(code, /styles=\{_ref\}/)
})

test('does not hoist styles that reference local bindings', async () => {
  const code = await transform(`
    import { css } from '@emotion/react'
    const SomeComponent = ({ color }) => <div css={css\`color: \${color};\`} />
  `)
  assert.doesNotMatch(code, /var _ref =/)
  assert.match(code, /label:SomeComponent/)
})

test('serializes a static css prop object at compile time', async () => {
  const code = await transform(`
    const SomeComponent = () => <div css={{ color: 'hotpink' }} />
  `)
  assert.match(code, /^var _ref =/m)
  assert.match(code, /css=\{_ref\}/)
  assert.match(code, /color:hotpink/)
})

test('adds a css import for a dynamic css prop object', async () => {
  const code = await transform(`
    const SomeComponent = ({ color }) => <div css={{ color }} />
  `)
  assert.match(code, /import \{ css as _css \} from "@emotion\/react"/)
  assert.match(code, /_css\(\{/)
})

test('transforms styled components', async () => {
  const code = await transform(`
    import styled from '@emotion/styled'
    const Button = styled.button\`color: hotpink;\`
  `)
  assert.match(code, /import _styled from "@emotion\/styled\/base"/)
  assert.match(code, /target:/)
  assert.match(code, /label: "Button"/)
})

test('transforms @emotion/css', async () => {
  const code = await transform(`
    import { css } from '@emotion/css'
    const cls = css\`color: hotpink;\`
  `)
  assert.match(code, /label:cls/)
})

test('transforms imports from @emotion/react/macro', async () => {
  const code = await transform(
    `
      import { css } from '@emotion/react/macro'
      const SomeComponent = () => <div css={css\`color: hotpink;\`} />
    `,
    [babelPluginMacros]
  )
  assert.match(code, /import \{ css \} from ["']@emotion\/react["'];/)
  assert.match(code, /^var _ref =/m)
  assert.match(code, /css=\{_ref\}/)
})
