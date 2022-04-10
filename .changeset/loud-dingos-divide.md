---
'@emotion/babel-plugin': patch
---

Fixed an issue in the minifying logic that could remove rules with the same context values as their parent rules. Like in the example below:

```js
styled.div`
  > div {
    color: blue;

    > div {
      color: hotpink;
    }
  }
`
```
