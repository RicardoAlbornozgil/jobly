module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",  // Transform JS, JSX, TS, and TSX files using Babel
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",  // Mock CSS and other styles
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",  // Mock file imports
  },
  transformIgnorePatterns: [
    "node_modules/(?!(axios|react-scripts)/)"  // Ensure that axios and react-scripts are transformed
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
};
