/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src/", "<rootDir>/tests/"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/types/**/*.ts"],
  coverageDirectory: "coverage",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  }
};
