/** @jsx jsx */
/* eslint-disable react/jsx-pascal-case */
import styled from '@emotion/styled/macro'
import { jsx } from '@emotion/react'

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

{
  const Timeline = styled.ul``
  Timeline.Item = styled.li``
  Timeline.Item.Anchor = styled.a``
}

{
  let Comp
  Comp = styled.div``
}
