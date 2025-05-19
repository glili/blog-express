module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 100000, // -> thrown: "Exceeded timeout of 5000 ms for a test.
    testRegex: '.e2e.test.ts$',
}