---
'@emotion/styled': major
'@emotion/cache': major
'@emotion/react': major
'@emotion/css': major
---

Removed special-casing of pseudo classes and pseudo elements. Previously they were always implicitly nested in the "current context" but that's not how many other popular CSS preprocessor work and conflicts with some newer CSS features like `:where` and `:is`.

You should migrate your code like this:

```diff
css`
-  :hover {
+  &:hover {
    color: hotpink;
  }
`
```
