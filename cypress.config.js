const { defineConfig } = require("cypress");
module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: false,
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    testIsolation: true,
    experimentalMemoryManagement: true,
    experimentalModifyObstructiveThirdPartyCode: true,
    numTestsKeptInMemory: 0,
    env: {
      USERNAME: "standard_user",
      PASSWORD: "secret_sauce",
      LOCKED_USERNAME: "locked_out_user",
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },
});
