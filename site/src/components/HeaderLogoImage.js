/** @jsx React.createElement **/
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
/**
 * Gatsby StaticQuery has some strange behavior around what kind of components
 * are allowed to be used. This is separated to avoid css prop triggering
 * jsx pragma change
 */
export default function HeaderLogoImage({ avatar }) {
  return (
    <StaticImage alt="Avatar" height={36} width={36} src="../assets/logo.png" />
  )
}
