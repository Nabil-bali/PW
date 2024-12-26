const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({

  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',

  testMatch: '*/*.spec.js',

  /*  testIgnore : '*\/exemple.spec.js', */

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.saucedemo.com/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'only-on-failure',

    screenshot: 'only-on-failure',
    
    /* video: 'only-on-failure', => don't exist*/
    // video: {
    //     mode: 'retain-on-failure',
    //     size: { width: 640, height: 480 }
    //   },

    permissions: ['geolocation'],

    timezoneId: 'Europe/Paris',
  },

  /* Configure projects for major browsers */
  projects: [
    { 
      name: "setup", 
      testMatch: '*/setup/*.js', 
      fullyParallel: true,
      teardown: 'cleanup storageFiles',
    },
    { 
      name: "cleanup storageFiles", 
      testMatch: '*/teardown/*.js', 
      fullyParallel: true,
    },
    {
      name: "ui-tests",
      dependencies: ["setup"],
      testMatch: '*/pomTestWithSetup.spec.js',
      storageState: 'state.json',
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

