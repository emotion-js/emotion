// @flow
/* eslint-env jest */
import serializer from '@emotion/jest'

// $FlowFixMe jest flow type definitions don't include new plugin API
expect.addSnapshotSerializer(serializer)
