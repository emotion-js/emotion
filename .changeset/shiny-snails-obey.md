---
'@emotion/babel-plugin': patch
---

Fixed a regression from [a PR which has optimized Babel output](https://github.com/emotion-js/emotion/pull/1656) which has caused inserted label not being extracted correctly and also broke styles composition in certain situations.
