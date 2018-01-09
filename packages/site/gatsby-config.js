const path = require('path')
const packages = require('./docs-yaml')().filter(
  ({ title }) => title === 'Packages'
)[0].items

module.exports = {
  siteMetadata: {
    title: `emotion`,
  },
  plugins: packages
    .map(pkg => path.resolve(`${__dirname}/../${pkg}/README.md`))
    .map(file => ({
      resolve: 'gatsby-source-filesystem',
      options: {
        path: file,
      },
    }))
    .concat([
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'docs',
          path: `${__dirname}/../../docs`,
        },
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/../../emotion.png`,
        },
      },
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            'gatsby-remark-prismjs',
            'gatsby-remark-autolink-headers',
            'gatsby-remark-smartypants',
            {
              resolve: `gatsby-remark-images`,
              options: {
                maxWidth: 590,
                linkImagesToOriginal: false,
              },
            },
          ],
        },
      },
      `gatsby-plugin-react-helmet`,
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      'gatsby-plugin-catch-links',
      {
        resolve: 'gatsby-plugin-netlify',
        options: {
          mergeLinkHeaders: true,
          allPageHeaders: [
            'Link: <https://unpkg.com/babel-standalone@6.26.0/babel.min.js>; rel=preload; as=script; cross-origin=anonymous',
          ],
        },
      },
    ]),
}
