// @flow
import * as Inferno from 'inferno'
import { createElement } from 'inferno-create-element'
import * as emotion from 'emotion'
import createEmotionStyled from 'create-emotion-styled'

/**
 * Since the main difference between Inferno and React
 * is the fact that they use different methods to create VNodes,
 * which boosts speed in the first package, simplicity in the second,
 * we simply create a mockup for the missing createElement function
 *
 * Please note that this lowers performance improvements
 * when using styled, considering that lots of the extra
 * the speed that inferno has comes from precompiling the type of the vnode
 * via its babel plugin. This could be ported to emotion as well but would
 * definitely take some time a modification of the current createEmotionStyled utility
 *
 * So mind that the current solution is better than using inferno-compat
 * alias, but also significantly lowers performance compared to a complete
 * solution that would be harder to achieve.
 */

export default createEmotionStyled(emotion, {
  // Theoretically only Component is needed
  // but passing the entire Inferno library is better
  // for both consistency with the react version and
  // future need of other properties from the library.
  ...Inferno,
  createElement
})

export * from 'emotion'
