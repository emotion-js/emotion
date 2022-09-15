---
'@emotion/serialize': patch
---

Fixed an issue that prevented using `content: "element(name)"`. This is a valid special value and doesn't need to be quoted.
