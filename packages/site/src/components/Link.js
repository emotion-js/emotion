import Link from 'gatsby-link'
import React from 'react'

export default ({ to, activeClassName, ...props }) =>
  to.match(/^https?:\/\//) ? (
    <a href={to} {...props} />
  ) : (
    <Link activeClassName={activeClassName} to={to} {...props} />
  )
