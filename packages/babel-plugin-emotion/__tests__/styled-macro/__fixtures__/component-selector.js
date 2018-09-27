import styled from '@emotion/styled/macro'

const SomeComponent = styled.div`
  color: hotpink;
`

let SomeOtherComponent = styled.div({ color: 'hotpink' })

let AnotherComponent = styled.div`
  ${SomeComponent} {
    color: green;
  }
  ${SomeOtherComponent} {
    color: green;
  }
`

let OneLastComponent = styled.div({
  [SomeComponent]: {
    color: 'green'
  },
  [SomeOtherComponent]: {
    color: 'green'
  }
})
