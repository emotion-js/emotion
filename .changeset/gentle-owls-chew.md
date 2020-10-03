---
'@emotion/sheet': patch
---

Generated style elements got `data-s="1"` attribute so `@emotion/cache` can recognize them as being already owned by another Emotion copy to avoid messing up existing style elements when initializing a new copy.
