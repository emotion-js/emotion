import weakMemoize from '@emotion/weak-memoize'

test('it works', () => {
  let doThing = weakMemoize(obj => {
    return {}
  })

  let firstArg = {}

  let firstResult = doThing(firstArg)

  let secondResult = doThing(firstArg)

  expect(firstResult).toBe(secondResult)

  let newObj = {}

  let newResult = doThing(newObj)

  expect(newResult).not.toBe(firstResult)
})
