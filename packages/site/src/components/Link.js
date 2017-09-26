import Link from 'gatsby-link'
import React from 'react'

export default ({ to, className, ...props }) =>
  to.match(/^https?:\/\//) ? (
    <a href={to} {...props} className={className} css={style} />
  ) : (
    <Link to={to} {...props} className={className} css={style} />
  )

const style = {
  textDecoration: 'none',
  color: 'currentColor',
  ':hover': {
    textDecoration: 'underline'
  }
}
