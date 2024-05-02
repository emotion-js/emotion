import { CSSObject, Keyframes, serializeStyles } from '@emotion/serialize'

declare const testTemplateStringsArray: TemplateStringsArray
declare const testKeyframes: Keyframes

const testCSSObject0: CSSObject = {
  animation: testKeyframes
}
const testCSSObject1: CSSObject = {
  animationName: testKeyframes
}

// $ExpectType SerializedStyles
serializeStyles([], {})
// $ExpectType SerializedStyles
serializeStyles([], {
  'emotion-cache': 'width: 200px'
})
// $ExpectType SerializedStyles
serializeStyles([], {}, {})
// $ExpectType SerializedStyles
serializeStyles(['abc'], {}, {})
// $ExpectType SerializedStyles
serializeStyles(['width: 200px;'], {}, {})
// $ExpectType SerializedStyles
serializeStyles([() => 'height: 300px;'], {}, {})
// $ExpectType SerializedStyles
serializeStyles(
  [
    'display: block;',
    {
      flexGrow: 1,
      backgroundColor: 'red'
    }
  ],
  {},
  {}
)
// $ExpectType SerializedStyles
serializeStyles<{
  vars: { background: string; foreground: string; step: number }
}>([
  {
    display: () => ['-webkit-flex', 'flex'],
    backgroundColor: ({ vars }) => vars.background,
    color: ({ vars }) => vars.foreground,
    lineHeight: ({ vars }) => 1.2,
    '--spacing': () => 1,
    '--step': ({ vars }) => `calc(${vars.step} * var(--spacing))`,
    '&:hover': {
      backgroundColor: ({ vars }) => vars.foreground,
      color: ({ vars }) => vars.background
    }
  }
])
// $ExpectType SerializedStyles
serializeStyles([testTemplateStringsArray, 5, '4px'], {}, {})

// $ExpectError
serializeStyles()
// $ExpectError
serializeStyles({})
// $ExpectError
serializeStyles([{ borderCollapse: () => 'unknown' }])
// $ExpectError
serializeStyles({}, {})

let cssObject: CSSObject = {
  fontWeight: 400,
  background: ['red'],
  otherProp: ['some-value'],
  ':hover': {
    fontWeight: 700,
    background: ['red'] as const,
    otherProp: ['some-value'] as const
  }
}

// $ExpectError
cssObject = { fontWeight: 'wrong' }
