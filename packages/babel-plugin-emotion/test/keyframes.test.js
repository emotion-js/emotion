// @flow
import { createInlineTests, createExtractTests } from './util'

const cases = {
  'keyframes basic': {
    code: `
      const rotate360 = keyframes\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;`,
  },

  'keyframes with interpolation': {
    code: `
      const rotate360 = keyframes\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(\${endingRotation});
        }
    \`;`,
    extract: false,
  },

  'static change import': {
    code: `
      const rotate360 = frames\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;
      const rotate3601 = keyframes\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;`,

    opts: { importedNames: { keyframes: 'frames' } },
  },

  'dynamic change import': {
    code: `
      import { keyframes as frames } from 'emotion'
      const rotate360 = frames\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;
      const rotate3601 = keyframes\`
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    \`;`,
  },
}

createInlineTests('keyframes', cases)

createExtractTests('keyframes extract', cases)
