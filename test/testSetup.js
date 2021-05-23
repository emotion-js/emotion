/* eslint-env jest */
import 'raf/polyfill'
import prettyCSS from './pretty-css'

if (typeof Node !== 'undefined') {
  let oldInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function(node, refNode) {
    if (refNode instanceof Node || refNode === null) {
      return oldInsertBefore.call(this, node, refNode)
    }
    throw new Error(
      'insertBefore only accepts a refNode which is null or a Node'
    )
  }
}

expect.addSnapshotSerializer(prettyCSS)
