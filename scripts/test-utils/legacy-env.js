// @flow
/* eslint-env jest */
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import './next-env'

Enzyme.configure({ adapter: new Adapter() })
