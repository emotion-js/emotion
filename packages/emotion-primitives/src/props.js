import viewStylePropTypes from 'react-primitives/lib/web/View/ViewStylePropTypes'
import textStylePropTypes from 'react-primitives/lib/web/Text/TextStylePropTypes'
import imageStylePropTypes from 'react-primitives/lib/web/Image/ImageStylePropTypes'

export const isValidStyleProp = (element, propName) => {
  if (element === 'Text') return textStylePropTypes[propName]
  if (element === 'View') return viewStylePropTypes[propName]
  if (element === 'Image') return imageStylePropTypes[propName]

  if (typeof element === 'function' && element.name === 'Text')
    return textStylePropTypes[propName]
  if (typeof element === 'function' && element.name === 'View')
    return viewStylePropTypes[propName]
  if (typeof element === 'function' && element.name === 'Image')
    return imageStylePropTypes[propName]

  return false
}
