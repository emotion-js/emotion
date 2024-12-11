/** @jsx jsx */
import createCache from '@emotion/cache'
import { CacheProvider, Global, jsx } from '@emotion/react'
import { StyleSheet } from '@emotion/sheet'
import renderer from 'react-test-renderer'
import { safeQuerySelector } from 'test-utils'
import 'test-utils/setup-env'

function stylisPlugin(element) {
  if (element.type === 'decl' && element.value.startsWith('color:')) {
    element.value = `color:hotpink;`
  }
}

function render(ele) {
  return renderer.create(ele).toJSON()
}

beforeEach(() => {
  safeQuerySelector('head').innerHTML = ''
  safeQuerySelector('body').innerHTML = ''
})

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

test('Global should "inherit" sheet class from the cache', () => {
  // https://github.com/emotion-js/emotion/issues/2675
  let cache = createCache({
    key: 'test',
    speedy: false
  })
  class MySheet extends StyleSheet {
    insert(rule) {
      super.insert(`/** ${this.key} */${rule}`)
    }
  }
  cache.sheet = new MySheet({
    key: 'test',
    container: safeQuerySelector('head')
  })

  render(
    <CacheProvider value={cache}>
      <div css={{ color: 'hotpink' }} />
      <Global styles={{ body: { width: '0' } }} />
    </CacheProvider>
  )

  expect(safeQuerySelector('head')).toMatchInlineSnapshot(`
    <head>
      <style
        data-emotion="test-global"
        data-s=""
      >
        
        /** test-global */body{width:0;}
      </style>
      <style
        data-emotion="test"
        data-s=""
      >
        
        /** test */.test-1lrxbo5{color:hotpink;}
      </style>
    </head>
  `)
})
