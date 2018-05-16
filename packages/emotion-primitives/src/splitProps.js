import { isPrimitiveProp, isValidStyleProp } from './props'

/**
 * Split primitive props, style props and styled component props into an object.
 */
export function splitProps(tag, { innerRef, ...rest }) {
  // Style overrides are the style props that are directly passed to the styled primitive <Text display='flex' />
  const styleOverrides = {}
  // Forward props are the one which are valid primitive props, hence these props are forwarded to the component.
  const returnValue = { toForward: {}, styleOverrides }

  return Object.keys(rest).reduce((split, propName) => {
    if (isPrimitiveProp(tag, propName)) {
      split.toForward[propName] = rest[propName]
    }

    if (isValidStyleProp(tag, propName)) {
      split.styleOverrides[propName] = rest[propName]
    }

    return split
  }, returnValue)
}
