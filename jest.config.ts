import type {Config} from 'jest';

const config: Config = {
  roots: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  preset: '@shelf/jest-mongodb',
};

export default config;
