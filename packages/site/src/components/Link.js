import Link from 'gatsby-link'
import React from 'react'

export default ({ to, ...props }) =>
  to.match(/^https?:\/\//) ? (
    <a href={to} {...props} />
  ) : (
    <Link to={to} {...props} />
  )
