const { createApolloFetch } = require('apollo-fetch')

const { GRAPH_TOKEN } = process.env

const client = createApolloFetch({
  uri: 'https://api.graph.cool/simple/v1/cj83urcdm0u420180bqw9w4mu',
})

client.use(({ request, options }, next) => {
  if (!options.headers) {
    options.headers = {} // Create the headers object if needed.
  }
  options.headers['Authorization'] = 'Bearer ' + GRAPH_TOKEN || ''

  next()
})

module.exports = function sendResult(vars) {
  return client({
    query: `
      mutation createRunAndResults($branch: String, $pr: String, $commit: String, $commitMessage: String, $results: [RunresultsResult!]) {
        createRun(results: $results, branch: $branch, pr: $pr, commit: $commit, commitMessage: $commitMessage) {
          createdAt
          branch
          pr
          commit
          commitMessage
          results {
            name
            duration
            type
          }
        }
      }
    `,
    variables: vars,
  })
}
