// @flow
/** @jsx jsx */
import 'test-utils/next-env'
import createCache from '@emotion/cache'
import { jsx, CacheProvider, Global } from '@emotion/react'
import { StyleSheet } from '@emotion/sheet'
import renderer from 'react-test-renderer'

function stylisPlugin(element) {
  if (element.type === 'decl' && element.value.startsWith('color:')) {
    element.value = `color:hotpink;`
  }
}

function render(ele) {
  return renderer.create(ele).toJSON()
}

test('with custom plugins', () => {
  let cache = createCache({
    key: 'custom-plugins',
    stylisPlugins: [stylisPlugin]
  })

  expect(
    render(
      <CacheProvider value={cache}>
        <div css={{ display: 'flex', color: 'blue' }} />
      </CacheProvider>
    )
  ).toMatchInlineSnapshot(`
    .emotion-0 {
      display: flex;
      color: hotpink;
    }

    <div
      className="emotion-0"
    />
  `)
})

test('with custom sheet', () => {
  // https://github.com/emotion-js/emotion/issues/2675
  let cache = createCache({
    key: 'test',
    speedy: false
  })

  class GlobalSheet extends StyleSheet {
    insert(rule) {
      return super.insert('/** global */' + rule)
    }
  }
  class MySheet extends StyleSheet {
    constructor(options) {
      super(options)
      if (Reflect.get(options.container, 'sheet')) {
        return new GlobalSheet(options)
      } else {
        Reflect.set(options.container, 'sheet', this)
      }
    }

    insert(rule) {
      super.insert(`/** ${this.key} */${rule}`)
    }
  }
  cache.sheet = new MySheet({ key: 'test', container: document.head })

  expect(
    render(
      <CacheProvider value={cache}>
        <div css={{ display: 'flex', color: 'blue' }} />
        <Global styles={{ body: { width: '0' } }} />
      </CacheProvider>
    )
  ).toMatchInlineSnapshot()
})
