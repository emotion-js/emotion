// @flow
/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Link as GatsbyLink } from 'gatsby'
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

export default function Link({ to, ...props }: Props) {
  return to.match(/^https?:\/\//) ? (
    // eslint-disable-next-line
    <a {...props} href={to} css={styles} />
  ) : (
    <GatsbyLink {...props} to={to} css={styles} />
  )
}
