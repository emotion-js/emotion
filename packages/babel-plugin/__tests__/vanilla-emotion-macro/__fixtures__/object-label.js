import { css } from '@emotion/css/macro'

let obj = {
  someProp: css({ color: 'green' }),
  anotherProp: css({ color: 'hotpink' })
}
class Thing {
  static Prop = css({ color: 'yellow' })
  BadIdea = css({ color: 'red' })
}
