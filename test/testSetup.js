// @flow
/* eslint-env jest */
import 'raf/polyfill'
import prettyCSS from './pretty-css'
import serializer from '@emotion/snapshot-serializer'

expect.addSnapshotSerializer(prettyCSS)
expect.addSnapshotSerializer(serializer)
