// playwright.config.js
const { devices } = require('@playwright/test');
const environments = require('./config/env.config');

const ENV = process.env.ENV || 'staging';
const envConfig = environments[ENV];
module.exports = {
  testDir: './tests',
  timeout: 50000,
  use: {
  baseURL: envConfig.baseURL,
    headless: false, // Show browser
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
  },
  reporter: [['html', { open: 'always' }]],
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
};