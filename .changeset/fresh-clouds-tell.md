---
'@emotion/jest': patch
---

Fix testing snapshot style reordering when the order that tests are run changes

Due to jest writing styles in the order it encounters rendered styled components across tests, an issue can occur where skipping/removing/reordering your tests will invalidate test snapshots.

This fix sorts the style elements when serializing emotion styles.
