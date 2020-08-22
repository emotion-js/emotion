/* eslint-disable */
import css from '@emotion/css/macro'
import _taggedTemplateLiteralLoose from '@babel/runtime/helpers/esm/taggedTemplateLiteralLoose'

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(['\n    color: hotpink;\n  '])

  _templateObject = function _templateObject() {
    return data
  }

  return data
}

// no label & source maps should be appended
const fooStyles = css(_templateObject())
