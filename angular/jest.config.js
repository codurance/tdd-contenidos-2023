module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect', '<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
};
