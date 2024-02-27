import { render } from '@testing-library/react'
console.error = jest.fn()

test('hasOwnProperty', async () => {
  // Freeze Object.prototype to not accidentally export its properties again
  // see https://github.com/emotion-js/emotion/issues/3158
  Object.freeze(Object.prototype)

  // const utils = (await import('../../dist/emotion-react.cjs.dev.js')).default
  // Previous version:
  // const utils = (await import('../../dist/emotion-element-48d2c2e4.cjs.dev.js'))
  //   .default

  // Current version:
  const utils = (await import('../../dist/emotion-element-212cccd8.cjs.dev.js'))
    .default

  expect(
    Object.prototype.hasOwnProperty.call(utils, 'hasOwnProperty')
  ).toBeFalsy()

  expect(console.error).not.toHaveBeenCalled()
})
