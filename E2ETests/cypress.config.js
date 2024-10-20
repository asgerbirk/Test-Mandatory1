const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8080', // Default URL for local development
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.{js,jsx,ts,tsx}',
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false, // Disable video recording to speed up CI pipeline
  screenshotOnRunFailure: true,
});