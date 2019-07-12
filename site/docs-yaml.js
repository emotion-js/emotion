const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const packageYamlPath = path.resolve(__dirname, '../docs/docs.yaml')

const loadDocsYaml = () => {
  const yamlString = fs.readFileSync(packageYamlPath).toString()

  return yaml.safeLoad(yamlString)
}

module.exports = loadDocsYaml

module.exports.getPackagesDirs = () => {
  const packages = loadDocsYaml().filter(({ title }) => title === 'Packages')[0]
    .items

  return packages.reduce((pkgMap, pkgName) => {
    const pkgDirname = pkgName.replace('@emotion/', '')
    pkgMap[pkgDirname] = path.resolve(`${__dirname}/../packages/${pkgDirname}`)
    return pkgMap
  }, {})
}
