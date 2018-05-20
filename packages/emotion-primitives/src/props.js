import viewStylePropTypes from 'react-primitives/lib/web/View/ViewStylePropTypes'
import textStylePropTypes from 'react-primitives/lib/web/Text/TextStylePropTypes'
import imageStylePropTypes from 'react-primitives/lib/web/Image/ImageStylePropTypes'

const viewStyleProps = Object.keys(viewStylePropTypes)
const textStyleProps = Object.keys(textStylePropTypes)
const imageStyleProps = Object.keys(imageStylePropTypes)

export const isValidStyleProp = (element, propName) => {
  if (element === 'Text') return textStyleProps.indexOf(propName) > -1
  if (element === 'View') return viewStyleProps.indexOf(propName) > -1
  if (element === 'Image') return imageStyleProps.indexOf(propName) > -1

  return false
}
