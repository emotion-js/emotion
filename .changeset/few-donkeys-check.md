---
'@emotion/serialize': patch
---

An additional semicolon is now inserted after interpolated arrays to cover cases when it doesn't have a trailing semi itself and thus breaking composition with styles coming after it.
