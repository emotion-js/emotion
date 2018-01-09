// @flow
// https://github.com/Skoli-Code/skoli-app-template/blob/8262fd0f1db12164b627cce8efefc9390a0c63ea/src/components/renderHAST.js
import * as React from 'react'
import type { HASTRoot, HASTText, HASTElement } from '../utils/types'

type Props = {
  hast: HASTRoot,
  componentMap?: { [key: string]: Function },
}

const RenderHAST = ({ hast, componentMap = {} }: Props) => {
  const renderTag = (node: HASTText | HASTElement, i: number) => {
    if (node.type === 'element') {
      const { tagName, properties, children } = node
      properties.key = i
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
