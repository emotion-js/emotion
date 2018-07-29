---
title: "Server Side Rendering"
---

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
