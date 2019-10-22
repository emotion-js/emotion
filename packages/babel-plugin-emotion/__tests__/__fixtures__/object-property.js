// @flow
import * as React from 'react'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'

const MyObject = {
  MyProperty: styled.div({ color: 'hotpink' })
}

function Logo(props) {
  return <MyObject.MyProperty />
}
