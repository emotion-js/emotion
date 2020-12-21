import '@babel/runtime/helpers/extends'
import '@babel/runtime/helpers/objectWithoutPropertiesLoose'
import '@babel/runtime/helpers/createForOfIteratorHelperLoose'
import '@emotion/css-prettifier'
import { c as createSerializer } from '../../dist/create-serializer-5e559c6e.esm.js'

var _createSerializer = createSerializer(),
  test = _createSerializer.test,
  serialize = _createSerializer.serialize

export { serialize, test }
