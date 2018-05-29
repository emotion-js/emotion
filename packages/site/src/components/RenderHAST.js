// @flow
// https://github.com/Skoli-Code/skoli-app-template/blob/8262fd0f1db12164b627cce8efefc9390a0c63ea/src/components/renderHAST.js
import { jsx } from '@emotion/core'
import css from '@emotion/css'
import type { HASTRoot, HASTText, HASTElement } from '../utils/types'

type Props = {
  hast: HASTRoot,
  componentMap?: { [key: string]: Function }
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
        properties.css = css('&&{' + properties.style + '}')
        delete properties.style
      }
      return jsx(
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
