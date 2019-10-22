// @flow
/* eslint-env jest */
import 'raf/polyfill'
import prettyCSS from './pretty-css'
// import serializer from '@emotion/snapshot-serializer'
if (typeof Node !== 'undefined') {
  let oldInsertBefore = Node.prototype.insertBefore
  // $FlowFixMe
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
// expect.addSnapshotSerializer(serializer)
