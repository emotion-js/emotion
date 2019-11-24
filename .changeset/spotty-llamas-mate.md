---
'babel-plugin-emotion': major
'@emotion/styled-base': major
'@emotion/styled': major
---

Removed support for `@emotion/styled-base` package. It has been moved to `@emotion/styled` and is available as `@emotion/styled/base`. This simplifies how the regular and base versions relate to each other and eliminates problems with stricter package managers when `@emotion/styled-base` was not installed explicitly by a user.
