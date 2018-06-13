// @flow
// https://github.com/Skoli-Code/skoli-app-template/blob/8262fd0f1db12164b627cce8efefc9390a0c63ea/src/components/renderHAST.js
import * as React from 'react'
import type { HASTRoot, HASTText, HASTElement } from '../utils/types'

type Props = {
  hast: HASTRoot,
  componentMap?: { [key: string]: Function }
}

const pattern = /-(\w|$)/g

const upperCaseCharacter = (dashChar, char) => char.toUpperCase()

const camelCaseCSSProperty = property => {
  property = property.toLowerCase()
  if (property.indexOf('-ms-') === 0) {
    return property.substr(1).replace(pattern, upperCaseCharacter)
  } else {
    return property.replace(pattern, upperCaseCharacter)
  }
}

const RenderHAST = ({ hast, componentMap = {} }: Props) => {
  const renderTag = (node: HASTText | HASTElement, i: number) => {
    if (node.type === 'element') {
      const { tagName, properties, children } = node
      properties.key = i
      if (properties.className && typeof properties.className !== 'string') {
        properties.className = properties.className.join(' ')
      }
      if (typeof properties.style === 'string') {
        properties.style = properties.style
          .split(';')
          .map(val => val.split(':'))
          .reduce((prev, current) => {
            prev[camelCaseCSSProperty(current[0])] = current[1]
            return prev
          }, {})
      }
      if (properties.ariaHidden !== undefined) {
        properties['aria-hidden'] = properties.ariaHidden
        delete properties.ariaHidden
      }
      return React.createElement(
        componentMap[tagName] || tagName,
        properties,
        (children.length && children.map(renderTag)) || undefined
      )
    } else {
      return node.value
    }
  }

  return hast.children.map(renderTag)
}

export default RenderHAST
