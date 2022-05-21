/* import type { Options } from './create-serializer' */
import { createSerializer as createEmotionSerializer } from './create-serializer'
import * as enzymeTickler from './enzyme-tickler'
import { createSerializer as createEnzymeToJsonSerializer } from 'enzyme-to-json'
import {
  isEmotionCssPropElementType,
  isStyledElementType,
  unwrapFromPotentialFragment
} from './utils'

const enzymeToJsonSerializer = createEnzymeToJsonSerializer({
  map: json => {
    if (typeof json.node.type === 'string') {
      return json
    }
    const isRealStyled = json.node.type.__emotion_real === json.node.type
    if (isRealStyled) {
      return {
        ...json,
        children: json.children.slice(-1)
      }
    }
    return json
  }
})

// this is a hack, leveraging the internal/implementation knowledge about the enzyme's ShallowWrapper
// there is no sane way to get this information otherwise though
const getUnrenderedElement = shallowWrapper => {
  const symbols = Object.getOwnPropertySymbols(shallowWrapper)
  const elementValues = symbols.filter(sym => {
    const val = shallowWrapper[sym]
    return !!val && val.$$typeof === Symbol.for('react.element')
  })
  if (elementValues.length !== 1) {
    throw new Error(
      "Could not get unrendered element reliably from the Enzyme's ShallowWrapper. This is a bug in Emotion - please open an issue with repro steps included:\n" +
        'https://github.com/emotion-js/emotion/issues/new?assignees=&labels=bug%2C+needs+triage&template=--bug-report.md&title='
    )
  }
  return shallowWrapper[elementValues[0]]
}

const wrappedEnzymeSerializer = {
  test: enzymeToJsonSerializer.test,
  print: (enzymeWrapper, printer) => {
    const isShallow = !!enzymeWrapper.dive

    if (isShallow && enzymeWrapper.root() === enzymeWrapper) {
      const unrendered = getUnrenderedElement(enzymeWrapper)
      if (
        isEmotionCssPropElementType(unrendered) ||
        isStyledElementType(unrendered)
      ) {
        return enzymeToJsonSerializer.print(
          unwrapFromPotentialFragment(enzymeWrapper),
          printer
        )
      }
    }

    return enzymeToJsonSerializer.print(enzymeWrapper, printer)
  }
}

export function createEnzymeSerializer({
  classNameReplacer,
  DOMElements = true,
  includeStyles = true
} /* : Options */ = {}) {
  const emotionSerializer = createEmotionSerializer({
    classNameReplacer,
    DOMElements,
    includeStyles
  })
  return {
    test(node) {
      return wrappedEnzymeSerializer.test(node) || emotionSerializer.test(node)
    },
    serialize(
      node,
      config,
      indentation /*: string */,
      depth /*: number */,
      refs,
      printer /*: Function */
    ) {
      if (wrappedEnzymeSerializer.test(node)) {
        const tickled = enzymeTickler.tickle(node)
        return wrappedEnzymeSerializer.print(
          tickled,
          // https://github.com/facebook/jest/blob/470ef2d29c576d6a10de344ec25d5a855f02d519/packages/pretty-format/src/index.ts#L281
          valChild => printer(valChild, config, indentation, depth, refs)
        )
      }
      // we know here it had to match against emotionSerializer
      return emotionSerializer.serialize(
        node,
        config,
        indentation,
        depth,
        refs,
        printer
      )
    }
  }
}
