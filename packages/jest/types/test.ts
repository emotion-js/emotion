import {
  matchers,
  CreateSerializerOptions,
  createSerializer
} from '@emotion/jest'
import * as serializer from '@emotion/jest/serializer'

createSerializer()
createSerializer({})
createSerializer({
  DOMElements: true
})
createSerializer({
  classNameReplacer() {
    return 'abc'
  }
})
createSerializer({
  classNameReplacer(className) {
    return className
  }
})
createSerializer({
  classNameReplacer(className, index) {
    return `${className}-${index}`
  }
})
createSerializer(213 as any as CreateSerializerOptions)
// @ts-expect-error
createSerializer(1)
// @ts-expect-error
createSerializer(true)
// @ts-expect-error
createSerializer({}, undefined as any)

expect.addSnapshotSerializer(serializer)
expect.addSnapshotSerializer(createSerializer())
expect.extend(matchers)

expect({}).toHaveStyleRule('width', 'black')
expect({}).toHaveStyleRule('height', /red/)
expect({}).toHaveStyleRule('color', expect.stringContaining('20'))
// @ts-expect-error
expect({}).toHaveStyleRule(5, 'abc')
