// @flow
import { createSerializer } from '@emotion/snapshot-serializer'

expect.addSnapshotSerializer(createSerializer())
