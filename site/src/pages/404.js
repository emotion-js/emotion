// @flow
/** @jsx jsx */
import { jsx } from '@emotion/core'
import Layout from '../layouts'

const NotFoundPage = () => {
  const title = 'NOT FOUND'
  return (
    <Layout title={title}>
      <div
        css={{
          filter: 'grayscale(100%)'
        }}
      >
        <h1>{title}</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.😢</p>
      </div>
    </Layout>
  )
}
export default NotFoundPage
