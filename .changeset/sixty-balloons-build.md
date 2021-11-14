---
'@emotion/cache': minor
---

Added `insertionPoint` option to the `createCache`. It can be used to insert rules after the specified element. For example, to use it with the `CacheProvider` from `@emotion/react` you can do this:

```jsx
const head = document.querySelector('head')

// <meta name="emotion-insertion-point" content="">
const emotionInsertionPoint = document.createElement('meta')
emotionInsertionPoint.setAttribute('name', 'emotion-insertion-point')
emotionInsertionPoint.setAttribute('content', '')

head.appendChild(emotionInsertionPoint)

// the emotion sheets should be inserted right after the meta tag
const cache = createCache({
  key: 'my-app',
  insertionPoint: emotionInsertionPoint
})

function App() {
  return (
    <CacheProvider value={cache}>
      <Main />
    </CacheProvider>
  )
}
```
