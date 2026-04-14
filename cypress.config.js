const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    defaultCommandTimeout: 10000,
    env: {
      USERNAME: "standard_user",
      PASSWORD: "secret_sauce",
      LOCKED_USERNAME: "locked_out_user",
    },
    setupNodeEvents(on, config) {},
  },
});
