module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['development']
  },
  transform: {
    '^.+\\.(tsx|ts|js)?$': 'babel-jest'
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__fixtures__/',
    '/site/',
    '/types/',
    // runs on node:test through `yarn test:babel8` because Babel 8 is ESM-only
    '\\.mjs$'
  ],
  setupFilesAfterEnv: ['test-utils/testSetup.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/packages/babel-plugin/test/util.js'
  ],
  snapshotFormat: {
    escapeString: false,
    printBasicPrototype: false
  }
}
