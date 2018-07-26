const { createSerializer } = require('jest-emotion')
const emotion = require('emotion')

module.exports = createSerializer(emotion)
