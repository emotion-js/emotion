// @flow
/* eslint-env jest */
import { createSerializer } from '@emotion/jest'

// $FlowFixMe jest flow type definitions don't include new plugin API
expect.addSnapshotSerializer(createSerializer())
