const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const packageYamlPath = path.resolve(__dirname, '../../docs/packages.yaml')

const yamlString = fs.readFileSync(packageYamlPath).toString()

module.exports = yaml.safeLoad(yamlString)
