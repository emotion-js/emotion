---
'@emotion/jest': patch
---

Improved stability of the generated snapshots - styles are extracted now based on the order in which the associated with them class names appear in the serialized elements rather than based on the order of the actual rules in the document.
