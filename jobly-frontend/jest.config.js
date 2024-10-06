module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Ensure this path is correct
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: [
    "node_modules/(?!axios)"  // Adjust this as needed to include any specific node modules
  ],
};
