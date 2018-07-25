// @flow
/* eslint-env jest */
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

process.env.LEGACY_TEST = 'true'

expect.addSnapshotSerializer(createSerializer(emotion))

Enzyme.configure({ adapter: new Adapter() })
