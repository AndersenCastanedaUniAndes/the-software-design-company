
/**
 * This configuration is needed for cypress version above 10.0.0
 * There are two kinds of configuration: Regular and Smart Monkey.
 * Only one of them must be uncommented.
 */

// Smart Monkey
module.exports = {
   reporter: 'cypress-mochawesome-reporter',
  e2e: {
    experimentalStudio: true,
    "projectId":"TSDL-Monkey-with-cypress",
    "baseUrl":"http://localhost:2369/ghost/",
    "env":{
        "appName":"App prueba - monkey",
         "events":300,
        "delay":300,
        "seed":2500,
        "pctClicks":50,
        "pctScroll":1,
        "pctSelectors":1,
        "pctKeys":2,
        "pctSpKeys":12,
        "pctPgNav":12,
        "pctBwChaos":5,
        "pctActions":17
    },
    "pageLoadTimeout":120000,
    "defaultCommandTimeout":120000,
    "videosFolder":"./results",
    "video": true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return {
        ...require('./cypress/plugins/index.js')(on, config),
        ... require('cypress-mochawesome-reporter/plugin')(on)
      }
    },
  },
}

// Regular Monkey
/**
 * 
 * module.exports = {
   reporter: 'cypress-mochawesome-reporter',
  e2e: {
    experimentalStudio: true,
    "projectId":"TSDL-Monkey-with-cypress",
    "baseUrl":"http://localhost:2369/ghost/",
    "env":{
        "appName":"App prueba - monkey",
        "events":300,
        "delay":300,
        "seed":3500,
        "pctClicks":50,
        "pctScroll":1,
        "pctSelectors":1,
        "pctKeys":16,
        "pctSpKeys":16,
        "pctPgNav":1
    },
    "pageLoadTimeout":120000,
    "defaultCommandTimeout":120000,
    "videosFolder":"./results",
    "video": true,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return {
        ...require('./cypress/plugins/index.js')(on, config),
        ... require('cypress-mochawesome-reporter/plugin')(on)
      }
    },
  },
}
 * 
 */


