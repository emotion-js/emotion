---
'@emotion/native': patch
'@emotion/styled': patch
---

author: @Andarist

`shouldForwardProp` has been changed from being a bivariant method to a contravariant function - it improves the type-safety for those that type this option.
