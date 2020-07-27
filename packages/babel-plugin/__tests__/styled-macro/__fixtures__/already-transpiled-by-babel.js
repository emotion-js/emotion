/* eslint-disable */
import styled from '@emotion/styled/macro'
import _taggedTemplateLiteralLoose from '@babel/runtime/helpers/esm/taggedTemplateLiteralLoose'

function _templateObject() {
  var data = _taggedTemplateLiteralLoose(['\n    color: hotpink;\n  '])

  _templateObject = function _templateObject() {
    return data
  }

  return data
}

// source maps should not be appended
const SomeComponent = styled('div')(_templateObject())
