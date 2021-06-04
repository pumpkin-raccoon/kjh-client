module.exports = {
  testPathIgnorePatterns: [
    "<rootDir>/.next/", 
    "<rootDir>/node_modules/",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/.next/", 
    "<rootDir>/node_modules/",
    '<rootDir>/public/utils/api',
  ],
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.js"],
  snapshotResolver: "<rootDir>/tests/snapshotResolver.js",
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", ""],
}
