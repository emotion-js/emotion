// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import Layout from '../layouts'

const NotFoundPage = () => {
  const title = 'NOT FOUND'
  return (
    <Layout title={title}>
      <h1>{title}</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.😢</p>
    </Layout>
  )
}

export default NotFoundPage
