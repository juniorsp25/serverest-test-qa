const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1366,
    viewportHeight: 768,
    video: false,
    env: {
      apiUrl: 'https://serverest.dev'
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
      return config;
    },
  },
});
