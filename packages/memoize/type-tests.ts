import memoize from '@emotion/memoize'

const x: string[] = memoize((arg: string) => [arg])('foo')

// @ts-expect-error
memoize((arg: number) => [arg])
