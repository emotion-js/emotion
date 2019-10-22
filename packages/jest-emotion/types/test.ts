import serializer, {
  matchers,
  CreateSerializerOptions,
  createSerializer,
  print,
  test
} from 'jest-emotion'

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
createSerializer((213 as any) as CreateSerializerOptions)
// $ExpectError
createSerializer(1)
// $ExpectError
createSerializer(true)
// $ExpectError
createSerializer({}, undefined as any)

expect.addSnapshotSerializer(serializer)
expect.addSnapshotSerializer(createSerializer())
expect.extend(matchers)

expect({}).toHaveStyleRule('width', 'black')
expect({}).toHaveStyleRule('height', /red/)
expect({}).toHaveStyleRule('color', expect.stringContaining('20'))
// $ExpectError
expect({}).toHaveStyleRule(5, 'abc')
