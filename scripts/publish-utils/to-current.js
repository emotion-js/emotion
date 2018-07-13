// @flow
const { changeLernaConfig } = require('./change-lerna-config')

changeLernaConfig(lerna => {
  lerna.packages = ['packages/*']
  lerna.npmClient = 'npm'
  delete lerna.useWorkspaces
})
