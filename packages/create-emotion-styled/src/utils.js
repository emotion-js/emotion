// @flow
import isPropValid from '@emotion/is-prop-valid'
import type { Interpolations } from 'create-emotion'

export function setTheme(theme: Object) {
  this.setState({ theme })
}

export const testPickPropsOnStringTag = isPropValid

export const testPickPropsOnComponent = (key: string) =>
  key !== 'theme' && key !== 'innerRef'
export const testAlwaysTrue = () => true

export const pickAssign: (
  testFn: (key: string) => boolean,
  target: {},
  ...sources: Array<{}>
) => Object = function(testFn, target) {
  let i = 2
  let length = arguments.length
  for (; i < length; i++) {
    let source = arguments[i]
    let key
    for (key in source) {
      if (testFn(key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

export type StyledOptions = {
  e?: string,
  label?: string,
  target?: string,
  shouldForwardProp?: (?string) => boolean
}

type CreateStyledComponent = (...args: Interpolations) => *

type BaseCreateStyled = (
  tag: any,
  options?: StyledOptions
) => CreateStyledComponent

export type CreateStyled = BaseCreateStyled & {
  [key: string]: CreateStyledComponent
}
