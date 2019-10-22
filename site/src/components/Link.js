// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Link } from 'gatsby'
import { constants } from 'styled-system'
import { colors } from '../utils/style'

type Props = {
  to: string,
  activeClassName?: string
}

const styles = {
  fontSize: constants.fontSizes[2],
  fontWeight: '500',
  color: colors.color,
  textDecoration: 'none',
  '&:hover': { color: colors.border }
}

export default ({ to, ...props }: Props) =>
  to.match(/^https?:\/\//) ? (
    <a href={to} css={styles} {...props} />
  ) : (
    <Link to={to} css={styles} {...props} />
  )
