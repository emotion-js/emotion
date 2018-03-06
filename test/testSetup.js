// @flow
/* eslint-env jest */
import 'raf/polyfill'
import { createSerializer } from 'jest-emotion'
import * as emotion from 'emotion'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import prettyCSS from './pretty-css'

expect.addSnapshotSerializer(createSerializer(emotion))

expect.addSnapshotSerializer(prettyCSS)

Enzyme.configure({ adapter: new Adapter() })
