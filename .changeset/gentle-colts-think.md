---
'@emotion/cache': patch
---

Fixed an issue with orphaned pseudo selectors (e.g. `:hover` - where `&:hover`, `div:hover`, etc are not considered orphaned) having the context selector (the one computed based on all ancestor levels selectors) doubled in a descendant at-rule.
