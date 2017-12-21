const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const packageYamlPath = path.resolve(__dirname, '../../docs/docs.yaml')

const yamlString = fs.readFileSync(packageYamlPath).toString()

module.exports = yaml.safeLoad(yamlString)
