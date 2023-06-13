---
'@emotion/core': major
'babel-plugin-emotion': patch
---

What: Keyframes are now minified in production build, which were not earlier.Why: Production build should always contain minified code so that resultant bundle size is minimum.How: -> Changes in the minify function of minify-utils.js file of babel-plugin-emotion.-> Addition of one new file i.e. macro.js file in @emotion/core.Note - Now, users need to import keyframe from @emotion/core/macro by using the following import, "import {keyframes} from '@emotion/core/macro' ".
