import weakMemoize from '@emotion/weak-memoize'

interface Foo {
  bar: 'xyz'
}

declare class Qwe {
  answer: number
}

// $ExpectType Foo[]
weakMemoize((arg: Foo) => [arg])({ bar: 'xyz' })

// @ts-expect-error
weakMemoize((arg: string) => [arg])('foo')

// @ts-expect-error
weakMemoize((arg: Foo) => [arg])(42)

// @ts-expect-error
weakMemoize((arg: string) => [arg])
// @ts-expect-error
weakMemoize((arg: number) => [arg])
// @ts-expect-error
weakMemoize((arg: boolean) => [arg])
// @ts-expect-error
weakMemoize((arg: symbol) => [arg])
// @ts-expect-error
weakMemoize((arg: null) => [arg])
// @ts-expect-error
weakMemoize((arg: undefined) => [arg])

weakMemoize((arg: () => void) => [arg])
weakMemoize((arg: Map<any, any>) => [arg])
weakMemoize((arg: Set<any>) => [arg])
weakMemoize((arg: Qwe) => [arg])
