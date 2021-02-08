# @emotion/sheet

> A StyleSheet for css-in-js libraries

```bash
yarn add @emotion/sheet
```

```jsx
import { StyleSheet } from '@emotion/sheet'

const sheet = new StyleSheet({ key: '', container: document.head })

sheet.insert('html { color: hotpink; }')
```

> **Note:**
> This is not useful for server-side rendering, you should implement SSR seperately

## StyleSheet

### Options

```ts
type Options = {
  nonce?: string
  key: string
  container: HTMLElement
  speedy?: boolean
  prepend?: boolean
}
```

#### nonce

A nonce that will be set on each style tag that the sheet inserts for [Content Security Policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

#### container

A DOM Node that the sheet will insert all of it's style tags into, this is useful for inserting styles into iframes.

#### key

This will be set as the value of the `data-emotion` attribute on the style tags that get inserted. This is useful to identify different sheets.

#### speedy

This defines how rules are inserted. If it is true, rules will be inserted with [`insertRule`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule) which is very fast but doesn't allow rules to be edited in DevTools. If it is false, rules will be inserted by appending text nodes to style elements which is much slower than insertRule but allows rules to be edited in DevTools. By default, speedy is enabled in production and disabled in development.

#### prepend

This defines where rules are inserted into the `container`. By default they are appended but this can be changed by using `prepend: true` option.

### Methods

#### insert

This method inserts a single rule into the document. It **must** be a single rule otherwise an error will be thrown in speedy mode which is enabled by default in production.

#### flush

This method will remove all style tags that were inserted into the document.

#### hydrate

This method moves given style elements into sheet's container and put them into internal tags collection. It's can be used for SSRed styles.

### Example with all options

```jsx
import { StyleSheet } from '@emotion/sheet'

const container = document.createElement('div')

document.head.appendChild(container)

const sheet = new StyleSheet({
  nonce: 'some-nonce',
  key: 'some-key',
  container
})

sheet.insert('html { color: hotpink; }')

sheet.flush()
```

# Thanks

This StyleSheet is based on [glamor's StyleSheet](https://github.com/threepointone/glamor) written by [Sunil Pai](https://github.com/threepointone). ❤️
