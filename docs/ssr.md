---
title: "Server Side Rendering"
---
Server-Side Rendering in emotion currently does not work with `extractStatic`. It's similar to [glamor's api](https://github.com/threepointone/glamor/blob/master/docs/server.md). For an example of emotion and next.js checkout the [with-emotion example in the next.js repo](https://github.com/zeit/next.js/tree/master/examples/with-emotion).

### renderStylesToString
This returns a string of html that inlines the critical css required right before it's used.

```jsx
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import App from './App'

const html = renderStylesToString(renderToString(<App />))
```


### renderStylesToNodeStream
This returns [Node Stream Writable](https://nodejs.org/api/stream.html#stream_class_stream_writable) that can be used to insert critical css right before it's required. This can be used with [React's streaming API](https://reactjs.org/docs/react-dom-server.html#rendertonodestream).

```jsx
import { renderToNodeStream } from 'react-dom/server'
import { renderStylesToNodeStream } from 'emotion-server'
import App from './App'

const stream = renderToNodeStream(<App />).pipe(renderStylesToNodeStream())
```


### extractCritical
This returns an object with the properties `html`, `ids` and `css`. It removes unused rules that were created with emotion(it still includes rules that were inserted with `injectGlobal`).

```jsx
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion-server'
import App from './App'


const { html, ids, css } = extractCritical(renderToString(<App />))

```

#### hydrate
`hydrate` should be called on the client with the `ids` that `extractCritical` returns. If you don't call it then emotion will reinsert all the rules. `hydrate` is **only** required for `extractCritical`, **not** for `renderStylesToString` or `renderStylesToNodeStream`, hydration occurs automatically with `renderStylesToString` and `renderStylesToNodeStream`.

```jsx
import { hydrate } from 'emotion'

hydrate(ids)

```
