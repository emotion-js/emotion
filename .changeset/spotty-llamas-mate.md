---
'babel-plugin-emotion': major
'@emotion/styled-base': major
'@emotion/styled': major
---

Removed support for @emotion/styled-base package. It got moved to @emotion/styled and is available as its new entry point - @emotion/styled/base. It simplifies how those 2 relate to each other and eliminates problems with stricter package managers when @emotion/styled-base was not installed explicitly by a user.
