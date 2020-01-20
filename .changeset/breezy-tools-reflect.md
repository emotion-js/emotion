---
'babel-plugin-emotion': patch
---

Fixed an issue with adding `label` & `target` options to `styled`-related calls when those properties were already set, causing those properties to be duplicated. This could have happened for example when transpiling already transpiled code or when providing those options manually (latter being less likely).
