const { changeLernaConfig } = require('./change-lerna-config')

changeLernaConfig(lerna => {
  lerna.packages = ['next-packages/*']
  lerna.version = 'independent'
  lerna.npmClient = 'npm'
  delete lerna.useWorkspaces
})
