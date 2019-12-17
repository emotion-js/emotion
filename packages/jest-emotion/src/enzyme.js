// @flow
import type { Options } from './serializer'
import { createSerializer as createEmotionSerializer } from './serializer'
import { createSerializer as createEnzymeSerializer } from 'enzyme-to-json'

const enzymeSerializer = createEnzymeSerializer({})

const tickle = (wrapper: *) => {
  if (typeof wrapper.dive === 'function') {
    wrapper.find('EmotionCssPropInternal').forEach(el => el.dive())
  }
  return wrapper
}

export function createSerializer({
  classNameReplacer,
  DOMElements = true
}: Options = {}) {
  const emotionSerializer = createEmotionSerializer({
    classNameReplacer,
    DOMElements
  })
  return {
    test(node: *) {
      return enzymeSerializer.test(node) || emotionSerializer.test(node)
    },
    print(node: *, printer: *) {
      let result = node
      if (enzymeSerializer.test(node)) {
        const tickled = tickle(node)
        result = enzymeSerializer.print(tickled, printer)
      }
      if (emotionSerializer.test(node)) {
        result = emotionSerializer.print(result, printer)
      }
      return result
    }
  }
}

export const { print, test } = createSerializer()

export default { print, test }
