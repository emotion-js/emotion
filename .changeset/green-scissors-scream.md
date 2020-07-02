---
'@emotion/babel-plugin': minor
---

Added support for converting assignment expressions to labels in cases like this:

```js
styles = css``
Timeline.Item = styled.li``
Timeline.Item.Anchor = styled.a``
```
