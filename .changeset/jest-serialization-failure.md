---
'@emotion/jest': patch
---

Fix an issue that broke serialization. Nodes in a render prop aren't writable, making the `delete node.props.className` instruction throw.
