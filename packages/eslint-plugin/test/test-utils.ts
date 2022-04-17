import resolveFrom from 'resolve-from'

export const espreeParser: string = resolveFrom(
  require.resolve('eslint'),
  'espree'
)
