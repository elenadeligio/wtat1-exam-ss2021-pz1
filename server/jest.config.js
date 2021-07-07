/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
    verbose: true,
    preset: '@shelf/jest-mongodb',
    testMatch: [  "**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)" ],
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
};
