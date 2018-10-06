// @flow
/* eslint-env jest */
// import { createSerializer } from 'jest-emotion'
// import * as emotion from 'emotion'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import './next-env'
// expect.addSnapshotSerializer(createSerializer(emotion))

Enzyme.configure({ adapter: new Adapter() })
