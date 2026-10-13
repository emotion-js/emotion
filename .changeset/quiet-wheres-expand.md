---
'@emotion/cache': patch
---

Fixed an issue with the context selector (`&`) used inside of a pseudo-class function (like `:where()`, `:is()` or `:not()`) not being replaced when the selector was part of a selector list.
