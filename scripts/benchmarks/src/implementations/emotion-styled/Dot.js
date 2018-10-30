import styled from '@emotion/styled'
import css from '@emotion/css'
import View from './View'

const Dot = styled(View)`
  position: absolute;
  cursor: pointer;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-top-width: 0;
  transform: translate(50%, 50%);
  ${props => css`
    margin-left: ${props.x}px;
    margin-top: ${props.y}px;
    border-right-width: ${props.size / 2}px;
    border-bottom-width: ${props.size / 2}px;
    border-left-width: ${props.size / 2}px;
    border-bottom-color: ${props.color};
  `};
`

export default Dot
