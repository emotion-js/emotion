/* eslint-env jest */
import 'test-utils/enzyme-env'
import { createEnzymeSerializer } from '@emotion/jest/enzyme'

expect.addSnapshotSerializer(createEnzymeSerializer())
