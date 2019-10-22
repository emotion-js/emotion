/** @jsx jsx */
import styled from '@emotion/styled/macro'
import { jsx } from '@emotion/core'

class Thing {
  static SomeComponent = styled.div`
    color: hotpink;
  `
  BadIdeaComponent = styled.div`
    background: hotpink;
  `
}

{
  // label should get sanitized
  const MiniCalWrap$ = styled.div`
    color: red;
  `
  const Test = () => <MiniCalWrap$ />
}
