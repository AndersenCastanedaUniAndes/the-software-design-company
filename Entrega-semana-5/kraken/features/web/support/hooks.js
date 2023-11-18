const { After, Before, AfterStep } = require('@cucumber/cucumber');
const { WebClient } = require('kraken-node');
const fs = require('fs-extra');

let stepCount = 0;
let featureName = '';
let ghostVersion = 'ghost-';

Before(async function (scenario) {
  this.deviceClient = new WebClient('chrome', {}, this.userId);
  this.driver = await this.deviceClient.startKrakenForUserId(this.userId);
  stepCount = 0; // reset the step count for each scenario
  featureName = scenario?.gherkinDocument.feature.name;
  let tag = scenario?.gherkinDocument.feature.tags[0].name;
  tag = tag.replace(/@/g, '');
  ghostVersion = ghostVersion.concat(tag);
});

After(async function () {
  await this.deviceClient.stopKrakenForUserId(this.userId);
});

AfterStep(async function () {
  stepCount++; // increment the step count
  try {
    const screenshotDir = `./VRT/${ghostVersion}/screenshots/${featureName}`;
    fs.ensureDirSync(screenshotDir); // Ensure the directory exists
    let screenshot = await this.driver.saveScreenshot(
      `./VRT/${ghostVersion}/screenshots/${featureName}/step_${stepCount}.png`
    ); // take screenshot
    this.attach(screenshot, 'image/png');
  } catch (error) {
    console.error('Could not take screenshot', error);
  }
});
