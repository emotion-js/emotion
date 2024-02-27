import { render } from '@testing-library/react'
console.error = jest.fn()

test('hasOwnProperty', async () => {
  'use strict'
  // Freeze Object.prototype to not accidentally export its properties again
  // see https://github.com/emotion-js/emotion/issues/3158
  Object.freeze(Object.prototype)

  // Previous version:
  // const utils = (await import('../../dist/emotion-element-48d2c2e4.cjs.dev.js'))
  //   .default

  // Current version:
  // const utils = (await import('../../dist/emotion-element-e909c831.cjs.dev'))
  //   .default

  // console.log(utils)
  // expect(
  //   Object.prototype.hasOwnProperty.call(utils, 'hasOwnProperty')
  // ).toBeFalsy()

  const element = await import('../../dist/emotion-react.worker.esm.js').default
  console.log(element)
  expect(
    Object.prototype.hasOwnProperty.call(element, 'hasOwnProperty')
  ).toBeFalsy()

  // /** @jsx jsx */
  // const { jsx } = await import('@emotion/react')
  // // const { CacheProvider } = await import('@emotion/react')
  // const { CacheProvider } = await import('../../dist/emotion-react.cjs.dev.js')
  // const createCache = await (await import('@emotion/cache')).default

  // const cache = createCache({ key: 'context' })
  // render(<CacheProvider cache={cache} />)
  expect(console.error).not.toHaveBeenCalled()
})
