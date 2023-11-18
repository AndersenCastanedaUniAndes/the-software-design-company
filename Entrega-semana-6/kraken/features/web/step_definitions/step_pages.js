const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const chai = require("chai");
const should = chai.should();

let selectedTag;

When("I go to the pages section with selector {string}", async function (selector) {
  let pagesButton = await this.driver.$(selector);
  return await pagesButton.click();
});

When("I click in the new page button with selector {string}", async function (selector) {
  let newPageButton = await this.driver.$(selector);
  return await newPageButton.click();
});

When("I click in the Publish button with selector {string}", async function (selector) {
  let publishButton = await this.driver.$(selector);
  return await publishButton.click();
});

When("I click in the Publish page confirm button with selector {string}", async function (selector) {
  let publishConfirmationButton = await this.driver.$(selector);
  return await publishConfirmationButton.click();
});

When("I go back to the list of pages clicking the pages button with selector {string}", async function (selector) {
  let goBackToPagesButton = await this.driver.$(selector);
  return await goBackToPagesButton.click();
});

When("I click the page in order to edit it {kraken-string}", async function (string) {
  let elementFound;
  let elements = await this.driver.$$("li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status");

  for (const element of elements) {
    let name = await element.$("a").getText();
    if (name.startsWith(string)) {
      elementFound = element.$$("a")[0];
      break;
    }
  }
  return await elementFound.click();
});

When("I click in the unpublish button with selector {string}", async function (selector) {
  let unpublishButton = await this.driver.$(selector);
  return await unpublishButton.click();
});

When("I click in unpublish and revert to draft button with selector {string}", async function (selector) {
  let unpublishAndRevertButton = await this.driver.$(selector);
  return await unpublishAndRevertButton.click();
});

When("I click in the settings button with selector {string}", async function (selector) {
  let settingsButton = await this.driver.$(selector);
  return await settingsButton.click();
});

When("I click in the tag dropdown with selector {string}", async function (selector) {
  let timeButton = await this.driver.$(selector);
  return await timeButton.click();
});

When("I click in the leave button with selector {string}", async function (selector) {
  let leave = await this.driver.$(selector);
  if (leave !== null) {
    return await leave.click();
  }
});

When("I click in the first tag dropdown option with selector {string}", async function (selector) {
  let options = await this.driver.$$(selector);

  selectedTag = await options[0].getText();

  return await options[0].click();
});

When("I click in the delete button with selector {string}", async function (selector) {
  let deleteButton = await this.driver.$(selector);
  return await deleteButton.click();
});

When("I click in the delete confirm button with selector {string}", async function (selector) {
  let deleteButton = await this.driver.$(selector);
  return await deleteButton.click();
});

Then("I visualize the preview page with selector {string}", async function (selector) {
  let preview = await this.driver.$(selector);

  expect(preview !== null).to.be.true;
});

Then("I visualize {kraken-string} in the list with selector {string}", async function (pageName, selector) {
  let foundPage = false;
  let pages = await this.driver.$$(selector);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName)) {
      foundPage = true;
      break;
    }
  }

  expect(foundPage).to.be.true;
});

Then("I visualize {kraken-string} with the selected tag in the list with selector {string}", async function (pageName, selector) {
  let foundPage = false;
  let pages = await this.driver.$$(selector);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName) && name.includes(selectedTag)) {
      foundPage = true;
      break;
    }
  }

  expect(foundPage).to.be.true;
});

Then("I visualize {kraken-string} as {string} in the list with selector {string}", async function (pageName, draft, selector) {
  let foundPage = false;
  let pages = await this.driver.$$(selector);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName) && name.includes(draft)) {
      foundPage = true;
      break;
    }
  }

  expect(foundPage).to.be.true;
});

Then("I visualize {kraken-string} is not in the list with selector {string}", async function (pageName, selector) {
  let foundPage = false;
  let pages = await this.driver.$$(selector);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName) && name.includes(draft)) {
      foundPage = true;
      break;
    }
  }

  expect(foundPage).to.be.false;
});
