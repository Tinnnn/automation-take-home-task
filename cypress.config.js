const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
   allowCypressEnv: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },

  e2e: {
    baseUrl: "https://matomo.org",
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    screenshotOnRunFailure: true,
  },
});
