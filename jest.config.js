module.exports = {
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  snapshotResolver: "<rootDir>/tests/snapshotResolver.js",
  // transform: {
  //   '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  // },
  // moduleNameMapper: {
  //   '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  // },
  // moduleDirectories: ["node_modules", ""],
}
