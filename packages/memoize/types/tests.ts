import memoize from '@emotion/memoize'

memoize<boolean>((arg: string) => !!arg)
memoize<number, boolean>((arg: number) => !!arg)

// $ExpectType string[]
memoize((arg: string) => [arg])('foo')

memoize((arg: number) => [arg])
