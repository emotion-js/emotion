// @flow
/* eslint-env jest */
import 'test-utils/enzyme-env'
import serializer from '@emotion/jest/enzyme'

expect.addSnapshotSerializer(serializer)
