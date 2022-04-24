import memoize from '@emotion/memoize'

// $ExpectType string[]
memoize((arg: string) => [arg])('foo')

memoize((arg: number) => [arg])
