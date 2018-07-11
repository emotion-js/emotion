const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const packageYamlPath = path.resolve(__dirname, '../docs/docs.yaml')

module.exports = () => {
  const yamlString = fs.readFileSync(packageYamlPath).toString()

  return yaml.safeLoad(yamlString)
}
