const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    projectId: "e2e-testing-with-cypress",
    baseUrl: '< Remplace con su URL de inicio de sesion de su instancia ghost por ejemplo http://localhost:2368/ghost/#/signin>',
    pageLoadTimeout:120000,
    defaultCommandTimeout:120000,
    testIsolation: true,
    videosFolder:"./videos",
    video: true,
    env:{},
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
