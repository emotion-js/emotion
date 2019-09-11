require('dotenv').config()

const fetch = require('node-fetch')
const DataLoader = require('dataloader')

function makeQuery(repos) {
  return `
      query {
        ${Object.keys(repos)
          .map(
            (repo, i) =>
              `a${i}: repository(
            owner: ${JSON.stringify(repo.split('/')[0])}
            name: ${JSON.stringify(repo.split('/')[1])}
          ) {
            ${repos[repo]
              .map(
                (commit, i) => `a${commit}: object(expression: ${JSON.stringify(
                  commit
                )}) {
            ... on Commit {
            commitUrl
            associatedPullRequests(first: 1) {
              nodes {
                number
                url
              }
            }
            author {
              user {
                login
                url
              }
            }
          }}`
              )
              .join('\n')}
          }`
          )
          .join('\n')}
        }
    `
}

// why are we using dataloader?
// it provides use with two things
// 1. caching
// since getInfo will be called inside of changeset's getReleaseLine
// and there could be a lot of release lines for a single commit
// caching is important so we don't do a bunch of requests for the same commit
// 2. batching
// getReleaseLine will be called a large number of times but it'll be called at the same time
// so instead of doing a bunch of network requests, we can do a single one.
const GHDataLoader = new DataLoader(async requests => {
  if (!process.env.GITHUB_TOKEN) {
    throw new Error(
      'Please create a GitHub personal access token at https://github.com/settings/tokens/new and add it as the GITHUB_TOKEN environment variable'
    )
  }
  let repos = {}
  requests.forEach(({ commit, repo }) => {
    if (repos[repo] === undefined) {
      repos[repo] = []
    }
    repos[repo].push(commit)
  })

  const data = await fetch(
    `https://api.github.com/graphql?access_token=${process.env.GITHUB_TOKEN}`,
    {
      method: 'POST',
      body: JSON.stringify({ query: makeQuery(repos) })
    }
  ).then(x => x.json())

  // this is mainly for the case where there's an authentication problem
  if (!data.data) {
    throw new Error(
      `An error occurred when fetching data from GitHub\n${JSON.stringify(
        data
      )}`
    )
  }

  let cleanedData = {}
  let dataKeys = Object.keys(data.data)
  Object.keys(repos).forEach((repo, index) => {
    cleanedData[repo] = {}
    for (let nearlyCommit in data.data[dataKeys[index]]) {
      cleanedData[repo][nearlyCommit.substring(1)] =
        data.data[dataKeys[index]][nearlyCommit]
    }
  })

  return requests.map(({ repo, commit }) => cleanedData[repo][commit])
})

async function getInfo(request) {
  if (!request.commit) {
    throw new Error('Please pass a commit SHA to getInfo')
  }

  if (!request.repo) {
    throw new Error(
      'Please pass a GitHub repository in the form of userOrOrg/repoName to getInfo'
    )
  }

  const data = await GHDataLoader.load(request)
  return {
    user: data.author && data.author.user ? data.author.user.login : null,
    pull:
      data.associatedPullRequests &&
      data.associatedPullRequests.nodes &&
      data.associatedPullRequests.nodes[0]
        ? data.associatedPullRequests.nodes[0].number
        : null,
    links: {
      commit: `[${request.commit}](${data.commitUrl})`,
      pull:
        data.associatedPullRequests &&
        data.associatedPullRequests.nodes &&
        data.associatedPullRequests.nodes[0]
          ? `[#${data.associatedPullRequests.nodes[0].number}](${
              data.associatedPullRequests.nodes[0].url
            })`
          : null,
      user:
        data.author && data.author.user
          ? `[@${data.author.user.login}](${data.author.user.url})`
          : null
    }
  }
}

/*
Hey, welcome to the changeset config! This file has been generated
for you with the default configs we use, and some comments around
what options mean, so that it's easy to customise your workflow.

You should update this as you need to craft your workflow.

Config provided by a CI command takes precedence over the contents of this file.

If a config option isn't present here, we will fall back to the defaults.
*/

const changesetOptions = {
  // If true, we will automatically commit the changeset when the command is run
  commit: false
}

// This function takes information about a changeset to generate an entry for it in your
// changelog. We provide the full changeset object as well as the version.
// It may be a good idea to replace the commit hash with a link to the commit.

/* the default shape is:
### Bump Type

- GIT_HASH: A summary message you wrote, indented?
*/

const getReleaseLine = async (changeset, type) => {
  const [firstLine, ...futureLines] = changeset.summary
    .split('\n')
    .map(l => l.trimRight())

  let { links } = await getInfo({
    repo: 'emotion-js/emotion',
    commit: changeset.commit
  })

  return `- ${links.commit}${links.pull === null ? '' : ` ${links.pull}`}${
    links.user === null ? '' : ` Thanks ${links.user}!`
  } - ${firstLine}\n${futureLines.map(l => `  ${l}`).join('\n')}`
}

// This function takes information about what dependencies we are updating in the package.
// It provides an array of related changesets, as well as the dependencies updated.

/*
- Updated dependencies: [ABCDEFG]:
- Updated dependencies: [HIJKLMN]:
  - dependencyA@1.0.1
  - dependencyb@1.2.0
*/
const getDependencyReleaseLine = async (changesets, dependenciesUpdated) => {
  if (dependenciesUpdated.length === 0) return ''

  const changesetLinks = changesets.map(
    changeset => `- Updated dependencies [${changeset.commit}]:`
  )

  const updatedDepenenciesList = dependenciesUpdated.map(
    dependency => `  - ${dependency.name}@${dependency.version}`
  )

  return [...changesetLinks, ...updatedDepenenciesList].join('\n')
}

const versionOptions = {
  // If true, we will automatically commit the version updating when the command is run
  commit: false,
  // Adds a skipCI flag to the commit - only valid if `commit` is also true.
  skipCI: false,
  // Do not modify the `changelog.md` files for packages that are updated
  updateChangelog: true,
  // A function that returns a string. It takes in options about a change. This allows you to customise your changelog entries
  getReleaseLine,
  // A function that returns a string. It takes in options about when a pacakge is updated because
  getDependencyReleaseLine,
  // An array of arrays that defines packages that are linked.
  // Linked packages are packages that should be at the same version when they're released.
  // If you've used Lerna to version packages before, this is very similar.
  linked: [
    [
      '@emotion/core',
      '@emotion/styled',
      '@emotion/styled-base',
      '@emotion/cache',
      '@emotion/css',
      'create-emotion',
      'emotion',
      'emotion-server',
      'create-emotion-server',
      'babel-plugin-emotion',
      '@emotion/babel-preset-css-prop',
      'jest-emotion',
      '@emotion/native',
      '@emotion/primitives',
      '@emotion/primitives-core',
      'eslint-plugin-emotion',
      'emotion-theming'
    ]
  ]
}

const publishOptions = {
  // This sets whether unpublished packages are public by default. We err on the side of caution here.
  public: true
}

module.exports = {
  versionOptions,
  changesetOptions,
  publishOptions
}
