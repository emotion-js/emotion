// @flow
import type { Options } from './create-serializer'
import { createSerializer as createEmotionSerializer } from './create-serializer'
import * as enzymeTickler from './enzyme-tickler'
import { createSerializer as createEnzymeToJsonSerializer } from 'enzyme-to-json'

const enzymeSerializer = createEnzymeToJsonSerializer({})

export function createEnzymeSerializer({
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
    serialize(
      node: *,
      config: *,
      indentation: string,
      depth: number,
      refs: *,
      printer: Function
    ) {
      if (enzymeSerializer.test(node)) {
        const tickled = enzymeTickler.tickle(node)
        return enzymeSerializer.print(
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
