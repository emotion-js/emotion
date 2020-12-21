import '@babel/runtime/helpers/extends'
import '@babel/runtime/helpers/objectWithoutPropertiesLoose'
import '@emotion/css-prettifier'
import { c as createSerializer } from '../../dist/create-serializer-31b41345.esm.js'

var _createSerializer = createSerializer(),
  test = _createSerializer.test,
  serialize = _createSerializer.serialize

export { serialize, test }
