import * as React from 'react'
import { Global } from '@emotion/react/macro'

const getBgColor = () => ({ backgroundColor: '#fff' })

export default () => <Global styles={[{ color: 'hotpink' }, getBgColor()]} />
