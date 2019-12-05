---
'@emotion/babel-plugin': major
'@emotion/react': major
'@emotion/css': major
---

Removed `@emotion/css` - it's main purpose was to allow `css` to be a Babel macro, but since babel-plugin-macros allows us to keep imports nowadays this is no longer needed. `@emotion/react/macro` has been added to account for this use case and appropriate changes has been made to `@emotion/babel-plugin` to facilitate those changes.

If you have used `@emotion/css` directly (it was always reexported from `@emotion/react`) or you have been using its macro then you should update your code like this:

```diff
-import css from '@emotion/css'
+import { css } from '@emotion/react'

// or
-import css from '@emotion/css/macro'
+import { css } from '@emotion/react/macro'
```
