---
'@emotion/cache': patch
'@emotion/css': patch
'@emotion/react': patch
---

Fixed an edge case issue with incorrect rules being generated. When a context selector (`&`) was used not at the beginning of a selector (which is not valid SCSS but is allowed by the Stylis parser that we are using) within a group of selectors containing a pseudoclass then it was not replaced correctly with the current context selector.
