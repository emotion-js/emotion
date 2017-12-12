const fs = require('fs')

module.exports = {
  siteMetadata: {
    title: `emotion`
  },
  plugins: fs
    .readdirSync(`${__dirname}/..`)
    .filter(
      dir => dir !== 'site' && dir !== 'benchmarks' && dir !== 'emotion-utils'
    )
    .map(dir => `${__dirname}/../${dir}/README.md`)
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
          name: 'blocks',
          path: `${__dirname}/src/blocks`
        }
      },
      {
        resolve: 'gatsby-source-filesystem',
        options: {
          path: `${__dirname}/../../emotion.png`
        }
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
                linkImagesToOriginal: false
              }
            }
          ]
        }
      },
      `gatsby-plugin-react-helmet`,
      'gatsby-plugin-sharp',
      'gatsby-plugin-emotion',
      'gatsby-transformer-sharp',
      'gatsby-plugin-netlify',
      'gatsby-plugin-catch-links'
    ])
}
