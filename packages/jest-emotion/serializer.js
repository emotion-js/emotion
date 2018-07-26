const { createSerializer } = require('./dist')
const emotion = require('emotion')

expect.addSnapshotSerializer(createSerializer(emotion))
