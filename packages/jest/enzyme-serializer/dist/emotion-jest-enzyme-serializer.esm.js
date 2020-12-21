import '@babel/runtime/helpers/extends'
import '@babel/runtime/helpers/objectWithoutPropertiesLoose'
import '@emotion/css-prettifier'
import '../../dist/create-serializer-31b41345.esm.js'
import 'enzyme-to-json'
import { c as createEnzymeSerializer } from '../../dist/create-enzyme-serializer-87aaf390.esm.js'

var _createEnzymeSerializ = createEnzymeSerializer(),
  test = _createEnzymeSerializ.test,
  serialize = _createEnzymeSerializ.serialize

export { serialize, test }
