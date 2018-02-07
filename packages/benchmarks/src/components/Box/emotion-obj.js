import styled from 'react-emotion/macro'
import View from '../View/emotion-obj'

const getColor = color => {
  switch (color) {
    case 0:
      return '#222'
    case 1:
      return '#666'
    case 2:
      return '#999'
    case 3:
      return 'blue'
    case 4:
      return 'orange'
    case 5:
      return 'red'
    default:
      return 'transparent'
  }
}

const Box = styled(View)(props => ({
  flexDirection: props.layout === 'column' ? 'column' : 'row',
  padding: props.outer ? 4 : 0,
  height: props.fixed ? 20 : 'auto',
  width: props.fixed ? 20 : 'auto',
  backgroundColor: getColor(props.color),
  '@media(min-width: 420px)': {
    padding: 8
  }
}))

export default Box
