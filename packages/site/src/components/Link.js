// @flow
import Link from 'gatsby-link'
import React from 'react'

type Props = {
  to: string,
  activeClassName?: string,
}

export default ({ to, activeClassName, ...props }: Props) =>
  to.match(/^https?:\/\//) ? (
    <a href={to} {...props} />
  ) : (
    <Link activeClassName={activeClassName} to={to} {...props} />
  )
