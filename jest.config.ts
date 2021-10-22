// jest.config.ts
import type { Config } from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    moduleDirectories: ["node_modules", "src"],
    setupFilesAfterEnv: ["<rootDir>/test/unit/jest-setup.ts"],
    testEnvironment: "jsdom"
};
export default config;
