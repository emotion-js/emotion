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
serializeStyles([testTemplateStringsArray, 5, '4px'], {}, {})

// $ExpectError
serializeStyles()
// $ExpectError
serializeStyles({})
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
