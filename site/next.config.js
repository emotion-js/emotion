// To run bundle analyzer, set the `ANALYZE` environment variable to 'true'.
// For example with PowerShell, run:
// $Env:ANALYZE='true'; yarn build
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  reactStrictMode: true,

  // These take effect in development and should match the redirects in netlify.toml
  async redirects() {
    return [
      {
        source: '/',
        destination: '/docs/introduction',
        permanent: true
      },
      {
        source: '/docs',
        destination: '/docs/introduction',
        permanent: true
      },
      {
        source: '/community',
        destination: '/docs/community',
        permanent: true
      }
    ]
  }
})
