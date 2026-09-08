---
'@emotion/babel-plugin': patch
---

Fixed `path.hoist is not a function` when compiling with Babel 8. `NodePath#hoist` was removed in Babel 8, so any file using the `css` prop or a `css` tagged template failed to build. Static serialized styles are still hoisted to module scope; styles that close over local bindings are left in place, as before.
