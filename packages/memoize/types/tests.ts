import memoize from '@emotion/memoize'

// $ExpectType string[]
memoize((arg: string) => [arg])('foo')

// @ts-expect-error
memoize((arg: number) => [arg])
