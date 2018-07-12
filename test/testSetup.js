// @flow
/* eslint-env jest */
import 'raf/polyfill'
import serializer from '@emotion/snapshot-serializer'

expect.addSnapshotSerializer(serializer)
