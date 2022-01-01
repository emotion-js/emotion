/** @type {import('next').NextConfig} */
module.exports = {
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
}
