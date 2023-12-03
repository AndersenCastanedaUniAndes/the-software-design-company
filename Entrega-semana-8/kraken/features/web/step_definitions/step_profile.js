const { When, Then } = require("@cucumber/cucumber");
const os = require("os");
const chai = require("chai");
const should = chai.should();


When("I click on profile element with selector {string}", async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  "I click on my profile button with the selector {string}",
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  "I click on change password button with selector {string}", async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  "I enter new data {kraken-string} into field with selector {string}",
  async function (string, string2) {
    let title = await this.driver.$(string2);
    await title.click();
    const selectAllKey = os.platform() === "darwin" ? "Meta" : "Control";

    if (string.includes("empty")) {
      string = string.replace("empty", "");
      await this.driver.keys([selectAllKey, "a"]);
      await this.driver.keys("Backspace");
      return await title.setValue(string);
    } 
    else if (string !== '_'){
      await this.driver.keys([selectAllKey, "a"]);
      await this.driver.keys("Backspace");
      return await title.setValue(string);
    }
  }
);

Then(
  "I save changes pressing save button with selector {string}",
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

Then(
  "I should see the profile done button with selector {string} or should not see a error message with selector {string}",
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

Then(
  "I should see the changed done message with selector {string} or should see a error message with selector {string}",
  async function (buttonSelector, errorSelector) {
    const selector1 = await this.driver.$(buttonSelector);
    const selector2 = await this.driver.$(errorSelector);

    if (!!selector2) {
      let errorModal = await this.driver.$(errorSelector);
      should.exist(errorModal);
    } else if (!!selector1) {
      let changedButton = await this.driver.$(buttonSelector);
      should.exist(changedButton);
    }
  }
);
