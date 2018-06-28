const path = require('path')
const packages = require('./docs-yaml')().filter(
  ({ title }) => title === 'Packages'
)[0].items

module.exports = {
  siteMetadata: {
    siteUrl: 'https://emotion.sh',
    title: `emotion`
  },
  plugins: packages
    .map(pkg => path.resolve(`${__dirname}/../${pkg}/README.md`))
    .map(file => ({
      resolve: 'gatsby-source-filesystem',
      options: {
        path: file
      }
    }))
    .concat([
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          name: 'docs',
          path: `${__dirname}/../../docs`
        }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/../../emotion.png`
        }
      },
      {
        // todo: contribute to gatsby-plugin-manifest
        // https://github.com/gatsbyjs/gatsby/issues/5887
        resolve: `gatsby-plugin-favicon-fork`,
        options: {
          logo: `${__dirname}/../../emotion.png`,
          injectHTML: true,
          icons: {
            android: false,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            twitter: false,
            yandex: false,
            windows: false
          }
        }
      },
      'gatsby-plugin-emotion-next-compat',
      {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
            'gatsby-remark-remove-readme-titles',
            'gatsby-remark-change-awesome',
            'gatsby-remark-live-code',
            'gatsby-remark-autolink-headers',
            'gatsby-remark-prismjs',
            'gatsby-remark-smartypants'
          ]
        }
      },
      `gatsby-plugin-react-helmet`,
      'gatsby-plugin-sharp',
      'gatsby-transformer-sharp',
      'gatsby-plugin-catch-links',
      'gatsby-plugin-sitemap',
      'gatsby-plugin-netlify'
    ])
}
