const { createSerializer } = require('./dist')
const emotion = require('emotion')

module.exports = createSerializer(emotion)
