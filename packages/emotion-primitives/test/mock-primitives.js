// @flow
/* eslint-env jest */

jest.mock('react-primitives', () => {
  // $FlowFixMe
  let realPrimitives = require.requireActual('react-primitives')

  return {
    ...realPrimitives,
    // mock the components to strings so that we can see the actual styles rather
    // than a bunch of class names that don't mean anything
    View: 'View',
    Text: 'Text',
    Image: 'Image'
  }
})
