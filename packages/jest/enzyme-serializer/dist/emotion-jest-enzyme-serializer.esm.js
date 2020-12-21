import '@babel/runtime/helpers/extends'
import '@babel/runtime/helpers/objectWithoutPropertiesLoose'
import '@babel/runtime/helpers/createForOfIteratorHelperLoose'
import '@emotion/css-prettifier'
import '../../dist/create-serializer-5e559c6e.esm.js'
import 'enzyme-to-json'
import { c as createEnzymeSerializer } from '../../dist/create-enzyme-serializer-d117e0f1.esm.js'

var _createEnzymeSerializ = createEnzymeSerializer(),
  test = _createEnzymeSerializ.test,
  serialize = _createEnzymeSerializ.serialize

export { serialize, test }
