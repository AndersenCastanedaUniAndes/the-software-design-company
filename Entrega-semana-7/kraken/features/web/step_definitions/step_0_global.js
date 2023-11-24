const { Given, Before, When, Then, AfterStep } = require("@cucumber/cucumber");
const { expect } = require("chai");
const assert = require("assert");

let tag = "";

Before(function (scenario) {
  tag = scenario?.gherkinDocument.feature.tags[0].name;
});

Given("I enter email {kraken-string}", async function (email) {
  let usernameInput = await this.driver.$('input[name="identification"]');
  return await usernameInput.setValue(email);
});

When("I enter password {kraken-string}", async function (password) {
  let passwordInput = await this.driver.$('input[name="password"]');
  return await passwordInput.setValue(password);
});

When("I click sign in button with selector {string}", async function (string) {
  let singInButton = await this.driver.$(string);
  return await singInButton.click();
});

When(
  "I enter title {kraken-string} into field with selector {string}",
  async function (string, string2) {
    let title = await this.driver.$(string2);
    await title.setValue(string);
    return await this.driver.keys("Enter"), this.driver.keys("Enter");
  }
);

Then(
  "I validate if I am in the dashboard page or I should see an error message if sign in fails",
  async function () {
    const url = await this.driver.getUrl();

    if (url.includes("dashboard")) {
      assert(true, "On dashboard page");
    } else {
      const errorMessage = await this.driver.$("p.main-error");
      const isVisible = await errorMessage.isDisplayed();
      assert(isVisible, "No error message found");
      console.info(`Error message found: ${await errorMessage.getText()}`);
    }
  }
);

When(
  "I click in the Continue, final review button with selector {string}",
  async function (selector) {
    let continueToFinalReviewButton = await this.driver.$(selector);
    if (tag.includes("4.48.9")) {
      continueToFinalReviewButton = await this.driver.$(
        "button.gh-publishmenu-button"
      );
    }
    return await continueToFinalReviewButton.click();
  }
);

When(
  "I go back to the editor section clicking the editor button with selector {string}",
  async function (selector) {
    if (tag.includes("4.48.9")) {
      return;
    }
    let goBackToEditorButton = await this.driver.$(selector);
    return await goBackToEditorButton.click();
  }
);

When(
  "I click in the preview button with selector {string}",
  async function (selector) {
    let previewButton = await this.driver.$(selector);
    if (tag.includes("4.48.9")) {
      previewButton = await this.driver.$(
        "button.gh-btn.gh-editor-preview-trigger"
      );
    }
    return await previewButton.click();
  }
);

When("I try to remove the new version banner", async function () {
  if (tag.includes("4.48.9")) {
    try {
      const button = await this.driver.$("button.gh-alert-close")?.click();
      if (button) {
        await button.click();
      } else {
        console.log("Button not found");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return;
});
