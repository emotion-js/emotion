---
title: 'Server Side Rendering'
---

Server side rendering works out of the box in emotion 10 and above

```jsx
import { renderToString } from 'react-dom/server'
import App from './App'

let html = renderToString(<App />)
```

## Using Emotion 10 with the old SSR APIs

It's still possible to use emotion 10 with the SSR api's in previous versions of emotion. It primarily exists for compatibility reasons.

```jsx
import createEmotionServer from 'create-emotion-server'
import createCache from '@emotion/cache'
import { renderToString } from 'react-dom/server'

let cache = createCache()

let { renderStylesToString } = createEmotionServer(cache)

let element = (
  <Provider value={cache}>
    <App />
  </Provider>
)

let html = renderStylesToString(renderToString(element))
```

## API

### renderStylesToString

This returns a string of html that inlines the critical css required right before it's used.

```jsx
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import App from './App'

const html = renderStylesToString(renderToString(<App />))
```

### renderStylesToNodeStream

This returns a [Node Stream Writable](https://nodejs.org/api/stream.html#stream_class_stream_writable) that can be used to insert critical css right before it's required. This can be used with [React's streaming API](https://reactjs.org/docs/react-dom-server.html#rendertonodestream).

```jsx
import { renderToNodeStream } from 'react-dom/server'
import { renderStylesToNodeStream } from 'emotion-server'
import App from './App'

const stream = renderToNodeStream(<App />).pipe(
  renderStylesToNodeStream()
)
```

### extractCritical

This returns an object with the properties `html`, `ids` and `css`. It removes unused rules that were created with emotion(it still includes rules that were inserted with `injectGlobal`).

```jsx
import { renderToString } from 'react-dom/server'
import { extractCritical } from 'emotion-server'
import App from './App'

const { html, ids, css } = extractCritical(
  renderToString(<App />)
)
```

#### hydrate

`hydrate` should be called on the client with the `ids` that `extractCritical` returns. If you don't call it then emotion will reinsert all the rules. `hydrate` is **only** required for `extractCritical`, **not** for `renderStylesToString` or `renderStylesToNodeStream`, hydration occurs automatically with `renderStylesToString` and `renderStylesToNodeStream`.

```jsx
import { hydrate } from 'emotion'

hydrate(ids)
```

## Next.js

To use emotion's SSR with Next.js you need a custom `Document` component in `pages/_document.js` that renders the styles and inserts them into the `<head>`.[ An example of Next.js with emotion can be found in the Next.js repo](https://github.com/zeit/next.js/tree/master/examples/with-emotion).

## Gatsby

To use emotion's SSR with Gatsby, you can use `gatsby-plugin-emotion` or you can do it yourself with emotion and Gatsby's various APIs but it's generally recommended to use `gatsby-plugin-emotion`. [There's an example available in the Gatsby repo](https://github.com/gatsbyjs/gatsby/tree/master/examples/using-emotion) or [you can look at this site which is built with Gatsby!](https://github.com/emotion-js/emotion/tree/master/packages/site)

```bash
yarn add gatsby-plugin-emotion
```

gatsby-config.js

```jsx
module.exports = {
  plugins: [...otherGatsbyPlugins, 'gatsby-plugin-emotion']
}
```

## Puppeteer

If you are using Puppeteer to prerender your application, emotion's `speedy` option has to be disabled so that the CSS is rendered into the DOM.

index.js

```jsx
// This has to be run before emotion inserts any styles so it's imported before the App component
import './disable-speedy'
import ReactDOM from 'react-dom'
import App from './App'

const root = document.getElementById('root')

// Check if the root node has any children to detect if the app has been prerendered
if (root.hasChildNodes()) {
  ReactDOM.hydrate(<App />, root)
} else {
  ReactDOM.render(<App />, root)
}
```

disable-speedy.js

```js
import { sheet } from 'emotion'

// Check if the root node has any children to detect if the app has been preprendered
// speedy is disabled when the app is being prerendered so that styles render into the DOM
// speedy is significantly faster though so it should only be disabled during prerendering
if (!document.getElementById('root').hasChildNodes()) {
  sheet.speedy(false)
}
```

> Note:
>
> The `sheet.speedy` call has to be run before anything that inserts styles so it has to be put into it's own file that's imported before anything else.
