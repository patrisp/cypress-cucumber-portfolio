const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on("file:preprocessor", cucumber());
    },
    specPattern: "cypress/e2e/*.feature",
    baseUrl: 'https://justjoin.it',
    viewportWidth: 1400,
    viewportHeight: 900,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 120000,
    chromeWebSecurity: false
  },
});
