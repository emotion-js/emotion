import React from 'react'
import { css } from 'glamor'

const styles = {
  position: 'absolute',
  transformOrigin: '0 0',
  left: '50%',
  top: '50%',
  width: '10px',
  height: '10px',
  background: '#eee',
  transform: 'scale(0.5)',
}

export default props => <div className={css(styles)}>{props.children}</div>
