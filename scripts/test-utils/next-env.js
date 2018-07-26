// @flow
/* eslint-env jest */
import { createSerializer } from '@emotion/snapshot-serializer'

expect.addSnapshotSerializer(createSerializer())
