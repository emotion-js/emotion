// @flow
/* eslint-env jest */
import 'test-utils/enzyme-env'
import serializer from 'jest-emotion/enzyme'

expect.addSnapshotSerializer(serializer)
