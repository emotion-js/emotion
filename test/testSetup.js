// @flow
/* eslint-env jest */
import 'raf/polyfill'
import prettyCSS from './pretty-css'

expect.addSnapshotSerializer(prettyCSS)
