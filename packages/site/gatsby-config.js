module.exports = {
  siteMetadata: {
    title: `emotion`
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: `${__dirname}/src/docs`
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
        plugins: ['gatsby-remark-prismjs']
      }
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-next'
  ]
}
