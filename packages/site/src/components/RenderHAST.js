// @flow
// https://github.com/Skoli-Code/skoli-app-template/blob/8262fd0f1db12164b627cce8efefc9390a0c63ea/src/components/renderHAST.js
import React, { createElement } from 'react'
import type { HASTRoot, HASTText, HASTElement } from '../utils/types'

type Props = {
  hast: HASTRoot,
  componentMap?: { [key: string]: Function }
}

const RenderHAST = ({ hast, componentMap = {} }: Props) => {
  const renderTag = (
    {
      type,
      tagName,
      properties = {},
      value,
      children = []
    }: HASTText | HASTElement,
    i: number
  ) => {
    properties.key = i

    if (type === 'element') {
      const Tag = componentMap[tagName]
      if (Tag) {
        return (
          <Tag {...properties}>
            {children.map(renderTag)}
            {value}
          </Tag>
        )
      } else {
        properties.key = i
        if (typeof properties.style === 'string') {
          properties.style = properties.style
            .split(';')
            .map(val => val.split(':'))
            .reduce((prev, current) => {
              prev[current[0]] = current[1]
              return prev
            }, {})
        }
        return createElement(
          tagName,
          properties,
          (children.length && children.map(renderTag)) || undefined
        )
      }
    } else {
      return value
    }
  }

  return hast.children.map(renderTag)
}

export default RenderHAST
