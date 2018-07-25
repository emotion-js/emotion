process.env.PREACT = true
jest.mock('react', () => require('emotion-react-mock-for-preact'))
