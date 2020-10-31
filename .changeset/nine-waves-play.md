---
'@emotion/core': minor
---

Support for [the new JSX runtimes](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) has been added. They require compatible React versions and shouldn't be manually used.

To use them you can use the new `@jsxImportSource @emotion/core` pragma instead of the old `@jsx jsx` or you can use `@emotion/babel-preset-css-prop` with `{ runtime: 'automatic' }` option to have it handled automatically for you for the whole project.
