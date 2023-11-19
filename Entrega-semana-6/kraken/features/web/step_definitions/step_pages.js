const { Before, Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const chai = require("chai");
const should = chai.should();

let selectedTag = '';
let tagVersion = '';

let pagesSectionSelector = {
  '@4.48.9': 'a[href="#/pages/"]',
  '@5.69.0': "a[data-test-nav='pages']"
};

let newPageButtonSelector = {
  '@4.48.9': 'a[href="#/editor/page/"]',
  '@5.69.0': 'a[data-test-new-page-button]'
};

let publishButtonSelector = {
  '@4.48.9': 'div.gh-publishmenu-trigger',
  '@5.69.0': "button[data-test-button='publish-flow']"
};

let continueToFinalReviewSelector = {
  '@4.48.9': 'button.gh-publishmenu-button',
  '@5.69.0': "button[data-test-button='continue']"
};

let publishConfirmSelector = {
  '@4.48.9': "button[data-test-button='confirm-publish']",
  '@5.69.0': "button[data-test-button='confirm-publish']"
};

let backToPagesSelector = {
  '@4.48.9': 'a[href="#/pages/"]',
  '@5.69.0': "a[data-test-link='pages']"
};

let pagesListItemSelector = {
  '@4.48.9': 'li.gh-posts-list-item',
  '@5.69.0': 'div.gh-posts-list-item-group'
};

let tagDropdownSelector = {
  '@4.48.9': 'div.ember-power-select-multiple-trigger',
  '@5.69.0': 'input.ember-power-select-trigger-multiple-input'
};

let unpublishSelector = {
  '@4.48.9': 'div.gh-publishmenu-trigger',
  '@5.69.0': "button[data-test-button='update-flow']",
};

let unpublishAndRevertSelector = {
  '@4.48.9': '',
  '@5.69.0': "button[data-test-button='revert-to-draft']"
};

let previewButtonSelector = {
  '@4.48.9': 'button.gh-editor-preview-trigger',
  '@5.69.0': "button[data-test-button='publish-preview']",
};

let previewPageSelector = {
  '@4.48.9': 'div.gh-post-preview-browser-container',
  '@5.69.0': "div.gh-post-preview-container.gh-post-preview-browser-container"
};

let deleteButtonSelector = {
  '@4.48.9': 'button.settings-menu-delete-button',
  '@5.69.0': '#entry-controls > div > div.settings-menu-content > div > button'
};

Before(function (scenario) {
  tagVersion = scenario?.gherkinDocument.feature.tags[0].name;
});

When("I go to the pages section", async function () {
  if (tagVersion.includes('4.48.9')) {
    try {
      const button = await this.driver.$('button.gh-alert-close')?.click();
      if (button) {
        button.click();
      } else {
        console.log('Button not found');
      }
    } catch (error) {
      console.error(error);
    }
  }

  let element = await this.driver.$(pagesSectionSelector[tagVersion]);
  return await element.click();
});

When("I click in the new page button", async function () {
  let element = await this.driver.$(newPageButtonSelector[tagVersion]);
  return await element.click();
});

When("I click in the page publish button", async function () {
  let element = await this.driver.$(publishButtonSelector[tagVersion]);
  return await element.click();
});

When("I click in the page continue, final review button", async function () {
  let element = await this.driver.$(continueToFinalReviewSelector[tagVersion]);
  return await element.click();
});

When("I click in the publish page confirm button", async function () {
  if (tagVersion.includes('4.48.9')) {
    return;
  }

  let element = await this.driver.$(publishConfirmSelector[tagVersion]);
  return await element.click();
});

When("I go back to the list of pages clicking the pages button", async function () {
  let element = await this.driver.$(backToPagesSelector[tagVersion]);
  return await element.click();
});

When("I click the page in order to edit it {kraken-string}", async function (pageName) {
  let elementFound;
  let pages = await this.driver.$$(pagesListItemSelector[tagVersion]);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName)) {
      elementFound = pages[i];
      break;
    }
  }

  return await elementFound.click();
});

When("I click in the page unpublish button", async function () {
  let element = await this.driver.$(unpublishSelector[tagVersion]);
  return await element.click();
});

When("I click in unpublish and revert to draft button", async function () {
  if (tagVersion.includes('4.48.9')) {
    let update = await this.driver.$("div.gh-publishmenu-radio");
    await update.click();

    let option;
    let options = await this.driver.$$('div.gh-publishmenu-radio-content');
    for (let i = 0; i < options.length; i++) {
      option = options[i];
      const title = await option.getText();
      if (title.includes('Unpublished')) {
        break;
      }
    }

    await option.click();

    let unpublish = await this.driver.$('button.gh-publishmenu-button');
    return await unpublish.click();
  } else {
    let element = await this.driver.$(unpublishAndRevertSelector[tagVersion]);
    return await element.click();
  }
});

When("I click in the settings button with selector {string}", async function (selector) {
  let settingsButton = await this.driver.$(selector);
  return await settingsButton.click();
});

When("I click in the page tag dropdown", async function () {
  let element = await this.driver.$(tagDropdownSelector[tagVersion]);
  return await element.click();
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

When("I click in the page delete button", async function () {
  let deleteButton = await this.driver.$(deleteButtonSelector[tagVersion]);
  return await deleteButton.click();
});

When("I click in the delete confirm button with selector {string}", async function (selector) {
  let deleteButton = await this.driver.$(selector);
  return await deleteButton.click();
});

When("I click in the page preview button", async function () {
  let deleteButton = await this.driver.$(previewButtonSelector[tagVersion]);
  return await deleteButton.click();
});

Then("I visualize the page preview", async function () {
  let preview = await this.driver.$(previewPageSelector[tagVersion]);
  expect(preview !== null).to.be.true;
});

Then("I visualize the page {kraken-string} in the page list", async function (pageName) {
  let foundPage = false;
  let pages = await this.driver.$$(pagesListItemSelector[tagVersion]);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName)) {
      foundPage = true;
      break;
    }
  }

  expect(foundPage).to.be.true;
});

Then("I visualize the page {kraken-string} with the tag in the page list", async function (pageName) {
  let foundPage = false;
  let pages = await this.driver.$$(pagesListItemSelector[tagVersion]);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName) && name.includes(selectedTag)) {
      foundPage = true;
      break;
    }
  }

  expect(foundPage).to.be.true;
});

Then("I visualize the page {kraken-string} as {string} in the page list", async function (pageName, draft) {
  let foundPage = false;
  let pages = await this.driver.$$(pagesListItemSelector[tagVersion]);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName)) {
      if (tagVersion.includes('4.48.9')) {
        let status = await pages[i].$('a.gh-post-list-status');
        let statusText = await status.getText();
        foundPage = statusText.includes('DRAFT');
      } else {
        foundPage = name.includes(draft);
      }

      if (foundPage) {
        break;
      }
    }
  }

  expect(foundPage).to.be.true;
});

Then("I visualize the page {kraken-string} is not in the page list", async function (pageName) {
  let foundPage = false;
  let pages = await this.driver.$$(pagesListItemSelector[tagVersion]);

  for (let i = 0; i < pages.length; i++) {
    let name = await pages[i].getText();

    if (name.startsWith(pageName) && name.includes(draft)) {
      foundPage = true;
      break;
    }
  }

  expect(foundPage).to.be.false;
});
