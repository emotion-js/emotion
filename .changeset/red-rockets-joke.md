---
'@emotion/sheet': patch
---

Reverted the change that has started to add an empty `<style/>` element eagerly in non-production environments that has been introduced in [`v1.0.0-next.3`](https://github.com/emotion-js/emotion/blob/next/packages/sheet/CHANGELOG.md#100-next3) as this has found to be problematic for websites using `Content-Security-Policy` and a `nonce`. Instead of this `@emotion/cache` will from now on insert an empty rule in non-production environments but it will only do that if an empty rule gets actually created by the user.
