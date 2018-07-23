process.env.PREACT = false
jest.mock('react', () => require('emotion-react-mock-for-preact'))
