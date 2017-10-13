import styled from 'react-emotion/macro'

const Dot = styled('div')`
  position: absolute;
  text-align: center;
  cursor: pointer;
  width: 0;
  height: 0;
  left: ${p => p.x + 'px'};
  top: ${p => p.y + 'px'};
  border-style: solid;
  border-width: ${({ size: s }) => `0 ${s / 2}px ${s / 2}px ${s / 2}px`};
  border-color: ${({ color }) =>
    `transparent transparent ${color} transparent`};
`

export default Dot
