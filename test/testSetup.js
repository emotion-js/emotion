// @flow
/* eslint-env jest */
import serializer from 'jest-emotion-react'
import * as emotion from 'emotion'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import prettyCSS from './pretty-css'

expect.addSnapshotSerializer(serializer(emotion))

expect.addSnapshotSerializer(prettyCSS)

Enzyme.configure({ adapter: new Adapter() })
