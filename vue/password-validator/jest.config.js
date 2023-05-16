module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  testMatch: ['**/tests/**/*.spec.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setupTest.ts'
  ]
}
