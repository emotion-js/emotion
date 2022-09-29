---
'@emotion/react': patch
---

Include vitest global check when omitting the warning about duplicate instantiation in mocked modules. Will only capture vitest global `vi` if globals are configured.
