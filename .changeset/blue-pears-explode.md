---
'@emotion/react': patch
'@emotion/styled': patch
---

Externalized code referencing `React.useInsertionEffect` to a separate `@emotion/use-insertion-effect-with-fallbacks` package. This package should be used in your defined externals if you bundle Emotion for whatever reason. It references `useInsertionEffect` in a very specific way that allows us to use it conditionally. However, if the code consuming Emotion is bundled as a library with Emotion in it then some bundlers might change the way in which we reference `useInsertionEffect` and that might create problems for bundlers used to consume the said library code. By externalizing this new package you can still bundle Emotion if you want to without running into this problem as you won't "destroy" the carefully crafted reference to `useInsertionEffect` in the process.

Note that we don't recommend bundling Emotion. You should have very specific reasons to do so.
