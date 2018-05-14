import React from 'react'
import transform from 'css-to-react-native'
import cssToObjects from 'css-to-object'
import primitives from 'react-primitives'

import { getStyles, resolveStyles } from './resolveStyles'
import { splitProps, getPrimitiveProps } from './splitProps'

const StyleSheet = primitives.StyleSheet

/*
  Renders the styles on iOS, Android and Sketch. Styles are first converted to objects, then to a valid format using StyleSheet.create

  TODO: Pass props to interpolate function
*/
function renderStylesOnNative(tag, styles) {
  // Raw css styles
  let css

  // Store styles which will be converted to RN
  const cssToRN = []

  // Store RN styles
  let rnStyles

  // If styles are not passed using the object styles
  if (typeof styles === 'object' && Object.keys(styles) == 0) {
    css = cssToObjects(styles.join(''))

    Object.keys(css).forEach(prop => {
      cssToRN.push([prop, css[prop]])
    })

    // Resolve the style using StyleSheet.create
    rnStyles = resolveStyles([transform(cssToRN)])
  } else {
    rnStyles = [...styles]
  }

  // TODO: Add all the emotion features here like theming and etc.
  return class extends React.Component {
    render() {
      // Collect valid style props for the primitive
      const { styleProps } = splitProps(tag, this.props)
      // Collect valid props for the primitive
      const primitiveProps = getPrimitiveProps(tag, this.props)

      return React.createElement(
        primitives[tag],
        {
          style: getStyles(rnStyles, this.props, styleProps, this.context),
          ...primitiveProps
        },
        this.props.children
      )
    }
  }
}
