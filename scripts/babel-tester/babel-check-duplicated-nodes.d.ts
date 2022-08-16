declare module 'babel-check-duplicated-nodes' {
  export default function checkDuplicatedNodes(
    babel: typeof import('@babel/core'),
    ast: import('@babel/core').types.File
  ): void
}
