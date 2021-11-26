export const espreeParser: string = require('resolve-from')(
  require.resolve('eslint'),
  'espree'
)
