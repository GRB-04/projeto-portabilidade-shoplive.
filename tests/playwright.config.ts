import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: 'http://127.0.0.1:8080',
    headless: true,
  },
  projects: [
    // Desktop
    {
      name: 'Desktop Chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    // Mobile
    {
      name: 'iPhone 14',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'Pixel 7',
      use: { ...devices['Pixel 7'] },
    },
    // Tablet
    {
      name: 'iPad Pro',
      use: { ...devices['iPad Pro'] },
    },
  ],
  reporter: [['html', { open: 'never' }], ['list']],
});
