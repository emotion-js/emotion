import {
  textProps,
  imageProps,
  viewProps,
  textStyleProps,
  viewStyleProps,
  imageStyleProps
} from './props'

function isValidStyleProp(element, propName) {
  if (element === 'Text') {
    return textStyleProps.includes(propName)
  } else if (element === 'View') {
    return viewStyleProps.includes(propName)
  } else if (element === 'Image') {
    return imageStyleProps.includes(propName)
  }

  return false
}

export function splitProps(rootEl, props) {
  const rest = { ...props }

  return Object.keys(rest).reduce(
    (acc, prop) => {
      if (isValidStyleProp(rootEl, prop)) acc.styleProps[prop] = rest[prop]

      return acc
    },
    { styleProps: {} }
  )
}

function isPrimitiveProp(element, propName) {
  if (element === 'Text') {
    return textProps.includes(propName)
  } else if (element === 'View') {
    return viewProps.includes(propName)
  } else if (element === 'Image') {
    return imageProps.includes(propName)
  }

  return false
}

export function getPrimitiveProps(element, props) {
  const acc = {}

  Object.keys(props).forEach(prop => {
    if (isPrimitiveProp(element, prop)) {
      acc[prop] = props[prop]
    }
  })

  return acc
}
