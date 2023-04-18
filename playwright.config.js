module.exports = {
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false,
    baseURL: 'http://localhost:4200',
  },
  projects: [
    {
      name: 'e2e',
      testMatch: '**/*.e2e.ts',
    },
  ],
};
