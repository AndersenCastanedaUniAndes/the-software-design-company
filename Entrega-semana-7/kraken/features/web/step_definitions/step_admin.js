const { Given, When, Then } = require("@cucumber/cucumber");
const axios = require("axios");
const os = require("os");
const assert = require("assert");
const chai = require("chai");
const should = chai.should();

Given("I make a GET request to {string}", async function (path) {
  this.response = await axios.get(`https://my.api.mockaroo.com/${path}`);
});

Then("the response status should be {int}", function (expectedStatus) {
  assert.equal(this.response.status, expectedStatus);
});

Then("the response should include {string}", function (expectedData) {
  assert(this.response.data.includes(expectedData));
});

When("I click on element with selector {string}", async function (string) {
  let element = await this.driver.$(string);
  return await element.click();
});

When(
  "I click on my profile button with selector {string}",
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  "I enter location {string} with selector {string}",
  async function (locationType, selector) {
    // Assuming the location data is stored in this.response.data.location
    const dataLength = this.response.data.length;
    const randomIndex = Math.floor(Math.random() * dataLength);

    const locationData = this.response.data[randomIndex][locationType];

    // Find the input element using the provided selector
    const inputElement = await this.driver.$(selector);

    // Select all text in the input element and delete it
    await inputElement.click();
    const selectAllKey = os.platform() === "darwin" ? "Meta" : "Control";
    await this.driver.keys([selectAllKey, "a"]);
    await this.driver.keys("Backspace");

    // Enter the location data into the input element
    return await inputElement.setValue(locationData);
  }
);

Then(
  "I save changes pressing button with selector {string}",
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

Then(
  "I should see the done button with selector {string} or should not see a error message with selector {string}",
  async function (buttonSelector, errorSelector) {
    const url = await this.driver.getUrl();

    if (url.includes("settings/staff/")) {
      let errorModal = await this.driver.$(errorSelector);
      should.exist(errorModal);
    } else {
      let doneButton = await this.driver.$(buttonSelector);
      should.exist(doneButton);
    }
  }
);
