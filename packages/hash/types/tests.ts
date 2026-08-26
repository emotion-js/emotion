import hash from '@emotion/hash'

// $ExpectType string
hash('color: hotpink;')

// @ts-expect-error
hash()
// @ts-expect-error
const hashed2: number = hash('color: hotpink;')
// @ts-expect-error
hash(42)
// @ts-expect-error
hash({})
// @ts-expect-error
hash('color: hotpink;', 'background-color: #fff;')
