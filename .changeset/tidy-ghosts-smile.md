---
'@emotion/react': patch
---

Changed the interface to which support for `css` prop is being added. It's now `React.Attributes` instead of `React.DOMAttributes<T>` and `JSX.IntrinsicAttributes`. This change is really minor and shouldn't affect any consuming code.
