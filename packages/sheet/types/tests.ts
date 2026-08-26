import { StyleSheet } from '@emotion/sheet'

new StyleSheet({
  key: 'abc',
  container: document.createElement('div')
})

new StyleSheet({
  key: 'abc',
  container: document.createElement('div'),
  nonce: 'fefwe090rqr'
})
new StyleSheet({
  key: 'abc',
  container: document.createElement('div'),
  speedy: true
})
// this has been commented out because the error location has moved in typescript@next at the time of writing this comment
// // @ts-expect-error
// new StyleSheet({
//   container: document.createElement('div'),
//   key: 120
// })
new StyleSheet({
  container: document.createElement('div'),
  // @ts-expect-error
  kye: 'abc'
})

const styleSheet0 = new StyleSheet({
  key: 'abc',
  container: document.createElement('div')
})
const styleSheet1: StyleSheet = styleSheet0
// @ts-expect-error
const styleSheet2: StyleSheet = new StyleSheet()
// @ts-expect-error
const styleSheet3: StyleSheet = new StyleSheet({})
// @ts-expect-error
const styleSheet4: StyleSheet = new StyleSheet({ key: 'mykey' })
// @ts-expect-error
const styleSheet5: StyleSheet = new StyleSheet({
  container: document.createElement('div')
})

const styleSheet = new StyleSheet({
  key: 'abc',
  container: document.createElement('div')
})

styleSheet.insert('.name{ color: black; }')
styleSheet.insert('.cl{ width: 200px; height: 200px; }')
// @ts-expect-error
styleSheet.insert()
// @ts-expect-error
styleSheet.insert('.name{ color: black; }', undefined as any)

styleSheet.flush()
// @ts-expect-error
styleSheet.flush(undefined as any)
// @ts-expect-error
styleSheet.flush(...(undefined as any as Array<any>))

const shadowRoot = document.createElement('div').attachShadow({ mode: 'open' })
const shadowStyleSheet = new StyleSheet({
  key: 'abc',
  container: shadowRoot
})
