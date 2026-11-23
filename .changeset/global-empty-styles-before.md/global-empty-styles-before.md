---
'@emotion/react': patch
---

Fix `Global` crashing when it is restored after its styles were empty and a neighbouring `Global` unmounted.
