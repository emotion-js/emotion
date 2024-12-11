/* eslint-env jest */
import { createSerializer } from '@emotion/jest'

expect.addSnapshotSerializer(createSerializer())
