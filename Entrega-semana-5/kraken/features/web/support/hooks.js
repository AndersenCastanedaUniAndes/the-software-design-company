const { After, Before, AfterStep } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');

let stepCount = 0;
let featureName = '';

Before(async function (scenario) {
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  stepCount = 0; // reset the step count for each scenario
  featureName = scenario?.gherkinDocument.feature.name;
});

After(async function () {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

AfterStep(async function () {
  stepCount++; // increment the step count
  try {
    let screenshot = await this.driver.saveScreenshot(
      `./reports/${this.testScenarioId}/screenshots/${featureName}_step_${stepCount}.png`
    ); // take screenshot
    this.attach(screenshot, 'image/png');
  } catch (error) {
    console.error('Could not take screenshot', error);
  }
});
