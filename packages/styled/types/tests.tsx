import * as React from 'react'
import styled from '@emotion/styled'

let ui: React.ReactElement<any>

// $ExpectType CreateStyledComponentIntrinsic<"a", {}, any>
styled.a
// $ExpectType CreateStyledComponentIntrinsic<"body", {}, any>
styled.body
// $ExpectType CreateStyledComponentIntrinsic<"div", {}, any>
styled.div
// $ExpectType CreateStyledComponentIntrinsic<"svg", {}, any>
styled.svg

const Button1 = styled.button({
  color: 'blue'
})
ui = (
  <div>
    <Button1 />
    <Button1 type="button" />
  </div>
)
