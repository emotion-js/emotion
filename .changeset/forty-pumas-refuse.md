---
'@emotion/react': patch
---

Exposed `__unsafe_useEmotionCache` which can be used to access the current Emotion's cache in an easier way than before. Using this might break 0-config SSR and is not recommended to be used unless there you know what you are doing and you are OK with the mentioned downside.
