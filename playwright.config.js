//ECHO is on.

const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests", // Directory for test files
  retries: 2, // Retry failing tests up to 2 times
  use: {
    baseURL: "http://localhost:3000", // Adjust based on your dev server
    headless: true, // Set to false if you want to see the browser during tests
    screenshot: "only-on-failure", // Capture screenshots on test failure
    video: "retain-on-failure", // Capture video on test failure
  },
});
