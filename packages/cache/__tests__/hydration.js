import { safeQuerySelector } from 'test-utils'
import hashString from '@emotion/hash'
import createCache from '@emotion/cache'

beforeEach(() => {
  safeQuerySelector('head').innerHTML = ''
  safeQuerySelector('body').innerHTML = ''
})

test('it works', () => {
  let css = `color:hotpink;`
  let hash = hashString(css)
  safeQuerySelector(
    'body'
  ).innerHTML = `<style data-emotion="css ${hash}">.css-${hash}{${css}}</style>`
  let cache = createCache({ key: 'css' })
  expect(cache.inserted).toEqual({ [hash]: true })
  expect(document.documentElement).toMatchSnapshot()
})

test('rehydrated styles to head can be flushed', () => {
  let css = `color:hotpink;`
  let hash = hashString(css)
  safeQuerySelector(
    'head'
  ).innerHTML = `<style data-emotion="emo ${hash}">.emo-${hash}{${css}}</style>`

  // this moves emotion style tags at initialization time
  jest.resetModules()
  require('@emotion/react')

  let cache = createCache({ key: 'emo' })
  expect(document.documentElement).toMatchSnapshot()
  cache.sheet.flush()
  expect(document.documentElement).toMatchSnapshot()
})

test('flushing rehydrated styles in the head only affect styles matching the cache key', () => {
  safeQuerySelector('head').innerHTML = [
    '<style data-emotion="emo 1lrxbo5">.emo-1lrxbo5{color:hotpink;}</style>',
    '<style data-emotion="css qweqwee">.css-qweqwee{color:red;}</style>'
  ].join('')

  // this moves emotion style tags at initialization time
  jest.resetModules()
  require('@emotion/react')

  const cache = createCache({ key: 'emo' })
  expect(document.documentElement).toMatchInlineSnapshot(`
    <html>
      <head>
        <style
          data-emotion="css qweqwee"
          data-s=""
        >
          .css-qweqwee{color:red;}
        </style>
        <style
          data-emotion="emo 1lrxbo5"
          data-s=""
        >
          .emo-1lrxbo5{color:hotpink;}
        </style>
      </head>
      <body />
    </html>
  `)

  cache.sheet.flush()
  expect(document.documentElement).toMatchInlineSnapshot(`
    <html>
      <head>
        <style
          data-emotion="css qweqwee"
          data-s=""
        >
          .css-qweqwee{color:red;}
        </style>
      </head>
      <body />
    </html>
  `)
})

test('should only hydrate style elements matching the cache key', () => {
  let css = `color:hotpink;`
  let hash = hashString(css)

  safeQuerySelector(
    'body'
  ).innerHTML = `<style data-emotion="emo ${hash}">.emo-${hash}{${css}}</style>`

  const cache = createCache({ key: 'custom-key' })

  expect(cache.inserted).toEqual({})
  expect(document.documentElement).toMatchInlineSnapshot(`
    <html>
      <head />
      <body>
        <style
          data-emotion="emo 1lrxbo5"
        >
          .emo-1lrxbo5{color:hotpink;}
        </style>
      </body>
    </html>
  `)

  const cache2 = createCache({ key: 'emo' })

  expect(cache2.inserted).toEqual({ [hash]: true })
  expect(document.documentElement).toMatchInlineSnapshot(`
    <html>
      <head>
        <style
          data-emotion="emo 1lrxbo5"
        >
          .emo-1lrxbo5{color:hotpink;}
        </style>
      </head>
      <body />
    </html>
  `)
})

test('Existing client-side inserted styles from Emotion 10 should not be moved', () => {
  // the nested nature isn't special, it's just meant to be a general "make sure they're not moved"
  safeQuerySelector(
    'body'
  ).innerHTML = `<div><style data-emotion="css-global"></style><div><style data-emotion="css"></style></div></div>`
  expect(document.documentElement).toMatchInlineSnapshot(`
    <html>
      <head />
      <body>
        <div>
          <style
            data-emotion="css-global"
          />
          <div>
            <style
              data-emotion="css"
            />
          </div>
        </div>
      </body>
    </html>
  `)

  const css = `color:hotpink;`
  const hash = hashString(css)
  let thing = document.createElement('div')
  thing.innerHTML = `<style data-emotion="css ${hash}">.css-${hash}{${css}}</style>`
  safeQuerySelector('body').appendChild(thing)
  jest.resetModules()
  require('@emotion/react')

  expect(document.documentElement).toMatchInlineSnapshot(`
    <html>
      <head>
        <style
          data-emotion="css 1lrxbo5"
          data-s=""
        >
          .css-1lrxbo5{color:hotpink;}
        </style>
      </head>
      <body>
        <div>
          <style
            data-emotion="css-global"
          />
          <div>
            <style
              data-emotion="css"
            />
          </div>
        </div>
        <div />
      </body>
    </html>
  `)
})
