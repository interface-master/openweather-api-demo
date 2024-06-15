import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.css$': 'jest-transform-css'
    },
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'css'],
};

export default config;