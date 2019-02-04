import React from 'react'
import Image from 'gatsby-image'

/**
 * Gatsby StaticQuery has some strange behavior around what kind of components
 * are allowed to be used. This is separated to avoid css prop triggering
 * jsx pragma change
 */
export default function HeaderLogoImage({ avatar }) {
  return (
    <Image
      style={{ display: 'inline-block', margin: 0, padding: 0 }}
      height="36px"
      width="36px"
      resolutions={avatar.childImageSharp.resolutions}
    />
  )
}
