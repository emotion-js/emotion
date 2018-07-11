// @flow
import { Link } from 'gatsby'
import React from 'react'

type Props = {
  to: string,
  activeClassName?: string
}

export default ({ to, ...props }: Props) =>
  to.match(/^https?:\/\//) ? (
    <a href={to} {...props} />
  ) : (
    <Link to={to} {...props} />
  )
