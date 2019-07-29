/** @jsx React.createElement **/
import React from 'react'
import Image from 'gatsby-image'
import { graphql, StaticQuery } from 'gatsby'

/**
 * Gatsby StaticQuery has some strange behavior around what kind of components
 * are allowed to be used. This is separated to avoid css prop triggering
 * jsx pragma change
 */
export default function HeaderLogoImage({ avatar }) {
  return (
    <StaticQuery
      query={graphql`
        query Avatar {
          avatar: file(name: { eq: "emotion" }) {
            childImageSharp {
              resolutions(width: 36, height: 36) {
                ...GatsbyImageSharpResolutions_withWebp_noBase64
              }
            }
          }
        }
      `}
      render={({ avatar }) => {
        return (
          <Image
            alt="Avatar"
            style={{ display: 'inline-block', margin: 0, padding: 0 }}
            height="36px"
            width="36px"
            resolutions={avatar.childImageSharp.resolutions}
          />
        )
      }}
    />
  )
}
