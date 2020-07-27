// @flow
/* eslint-env jest */
import 'test-utils/enzyme-env'
import { createEnzymeSerializer } from '@emotion/jest'

// $FlowFixMe jest flow type definitions don't include new plugin API
expect.addSnapshotSerializer(createEnzymeSerializer())
