import * as React from 'react'
import { Global } from '@emotion/core/macro'

const getBgColor = () => ({ backgroundColor: '#fff' })

export default () => <Global styles={{ color: 'hotpink', ...getBgColor() }} />
