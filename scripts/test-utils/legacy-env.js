// @flow
/* eslint-env jest */
import 'test-utils/enzyme-env'
import serializer from '@emotion/jest/enzyme'

// $FlowFixMe jest flow type definitions don't include new plugin API
expect.addSnapshotSerializer(serializer)
