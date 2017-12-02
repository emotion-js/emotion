// @flow
/* eslint-env jest */
import serializer from 'jest-glamor-react'
import { sheet } from 'emotion'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import prettyCSS from './pretty-css'

expect.addSnapshotSerializer(serializer(sheet))

expect.addSnapshotSerializer(prettyCSS)

Enzyme.configure({ adapter: new Adapter() })
