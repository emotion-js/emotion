/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

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
