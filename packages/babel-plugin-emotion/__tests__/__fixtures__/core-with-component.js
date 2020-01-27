// @flow
import styled from '@emotion/styled'

const MyComponent = styled.div({ color: 'hotpink' })

const OtherComponent = MyComponent.withComponent('section')
