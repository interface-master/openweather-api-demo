const config = {
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'css'],
    preset: 'ts-jest',
    setupFiles: ['<rootDir>/jest.env.js'],
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.css$': 'jest-transform-css'
    },
    verbose: true,
};

module.exports = config;