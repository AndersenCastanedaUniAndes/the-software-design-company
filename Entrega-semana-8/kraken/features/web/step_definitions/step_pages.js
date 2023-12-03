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

// A priori steps
let aPrioriTitle = '';
const splashImagesSelector = 'button[class="gh-editor-feature-image-unsplash"]';
const imageFromImagesSelector = "div.gh-unsplash-photo-container";
const insertImageSelector = '#unsplash-selector-wormhole > div.absolute.top-8.right-8.bottom-8.left-8.br4.overflow-hidden.bg-white.z-9999 > div.flex.flex-column.h-100 > div > a > a > div > div > div.gh-unsplash-photo-footer > a';

const specialCharRgx = /^[^a-zA-Z0-9]+$/;
const emojiRgx = /^(?:[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}-\u{2BFF}\u{200D}\u{FE0F}\u{20E3}\u{E0020}-\u{E007F}\s])+$/u;

const cardOptionSelector = {
  'HTML': 'button[data-kg-card-menu-item="HTML"]',
  'PUBLIC_PREVIEW': 'button[data-kg-card-menu-item="Public preview"]',
  'DIVIDER': 'button[data-kg-card-menu-item="Divider"]',
  'CALLOUT': 'button[data-kg-card-menu-item="Callout"]',
  'BUTTON': 'button[data-kg-card-menu-item="Button"]',
  'YOUTUBE': 'button[data-kg-card-menu-item="YouTube"]',
};

const cardOptionElementSelector = {
  'PUBLIC_PREVIEW': 'button[data-kg-card="paywall"]',
  'DIVIDER': 'button[data-kg-card="horizontalrule"]',
  'CALLOUT': 'button[data-kg-card="callout"]',
  'BUTTON': 'button[data-kg-card="button"]',
  'YOUTUBE': 'button[data-kg-card="embed"]',
}

const htmlTags = ["div", "h1", "h2", "id"];

const htmlBear = '<body style="background: #84EDBE;">' +
'<div style="position: relative; margin: auto; display: block; margin-top:8%; width:600px; height:420px; background:none; border: solid 4px white;">' +
  '<div style="position:absolute; top:16.5%; left:25%; width:50%; height:67%; background:#9F7F5C; border-radius:50%;">' +
    '<div style="width: 100%; height: 100%; position: absolute; background: #9F7F5C; border-radius: 50%; z-index: 2;"></div>' +
    '<div style="position: absolute; width: 40%; height: 42%; left: -15%; top: 2%; background: #9F7F5C; border-radius: 50%; z-index: 1;">' +
      '<div style="position: absolute; border-radius: 50%; width: 80%; height: 80%; top: 10%; left: 10%; background: #643A10;"></div>' +
    '</div>' +
    '<div style="position: absolute; width: 40%; height: 42%; right: -15%; top: 2%; background: #9F7F5C; border-radius: 50%; z-index: 1;">' +
      '<div style="position: absolute; border-radius: 50%; width: 80%; height: 80%; top: 10%; left: 10%; background: #643A10;"></div>' +
    '</div>' +
    '<div style="position: absolute; background: white; width: 20%; height: 23%; top: 24%; left: 23%; border-radius: 50%; z-index: 3;">' +
      '<div style="position: absolute; width: 28%; height: 30%; top: 35%; left: 36%; border-radius: 50%; background: #27354A;"></div>' +
    '</div>' +
    '<div style="position: absolute; background: white; width: 20%; height: 23%; top: 24%; right: 23%; border-radius: 50%; z-index: 3;">' +
      '<div style="position: absolute; width: 28%; height: 30%; top: 35%; left: 36%; border-radius: 50%; background: #27354A;"></div>' +
    '</div>' +
    '<div style="position:absolute; z-index:2; width:55%; height:55%; background:#FFFCD3; border-radius:90px; top:45%; left:23%;">' +
      '<div style="position: absolute; background: #000000; width: 30%; height: 22.5%; left: 36%; top: 10%; border-radius: 50%; z-index: 4;"></div> '+
      '<div style="position:absolute; z-index:4; width:2%; height:40%; background:black; left:50%; top:32%;"></div>' +
      '<div style="position:absolute; z-index:4; width:50%; height:3%; background:black; top:70%; left:25%; border-radius: 50%/100% 100% 0 0; transform: rotate(180deg);"></div>' +
    '</div>' +
  '</div>' +
'</div>' +
'</body>';

function GetHtmlTagsAndStyleFromText(text) {
  let tagElements = [];
  let htmlCopy = "";
  let i = 0;

  while (htmlCopy.length > 0) {
    let tag = "<" + htmlTags[i];
    if (!htmlCopy.includes(tag)) {
      ++i;

      if (i == htmlTags.length) {
        // Nothing more to check
        break;
      }

      continue;
    }

    let startIndex = htmlCopy.indexOf(tag);
    let endIndex = htmlCopy.indexOf(">", startIndex);

    let subString = htmlCopy.substring(startIndex, endIndex);
    htmlCopy = htmlCopy.replace(subString, '');

    // Removes tag from substring to get style="background-color: red"
    subString = subString.replace(tag, '');
    subString = subString.replace('>', '');

    let style = subString.trim();

    tagElements.push([htmlTags[i], style]);
  }

  htmlCopy = htmlCopy.replace(/</g, '');
  htmlCopy = htmlCopy.replace(/>/g, '');
  htmlCopy = htmlCopy.replace(/\//g, '');

  return {
    'elements': tagElements,
    'text': htmlCopy
  };
}

When("I open the splash images to select one", async function () {
  let splashButton = await this.driver.$(splashImagesSelector);
  return await splashButton.click();
});

When("I select one image from the image options", async function () {
  let image = await this.driver.$$(imageFromImagesSelector)[0];
  return await image.click();
});

When("I insert the image from the selection", async function () {
  let elements = await this.driver.$$(insertImageSelector);
  let element;

  for (let i = 0; i < elements.length; i++) {
    let name = await elements[i].getText();
    if (name.includes("Insert image")) {
      element = elements[i];
      break;
    }
  }

  return await element.click();
});

When("I enter the title {string} into the page title field", async function (title) {
  aPrioriTitle = title;

  let element = await this.driver.$("textarea.gh-editor-title");
  await element.setValue(aPrioriTitle);
  return await this.driver.keys("Enter"), this.driver.keys("Enter");
});

When("I click in the leave button if is required", async function () {

  if (aPrioriTitle.length <= 255) {
    return;
  }

  let leave = await this.driver.$("button.gh-btn.gh-btn-red");
  if (leave !== null) {
    return await leave.click();
  }
});

When("I add the {string} in the URL field", async function (url) {
  let element = await this.driver.$('input[id="url"]');
  await element.click();
  return await element.setValue(url);
});

When("I click in the add a card button", async function () {
  let element = await this.driver.$('button[aria-label="Add a card"]');
  await element.click();
});

When("I click in the card option {string}", async function (option) {
  let element = await this.driver.$(cardOptionSelector[option]);
  await element.click();

  if (option == "YOUTUBE") {
    var input = await this.driver.$('input[data-testid="embed-url"]');
    await input.setValue('https://www.youtube.com/watch?v=0X2wWg3lz6s');
    await this.driver.keys("Enter");
  }
});

When("I enter the HTML content {string} in the card", async function (html) {
  if (html == "Bear") {
    html = htmlBear;
  }

  let element = await this.driver.$('div[class="cm-line"]');
  await element.click();
  return await element.setValue(html);
});

When("I click outside the card", async function () {
  let container = await this.driver.$('div[class="gh-editor-title-container page-improvements"]');
  await container.click();
});

Then("I visualize the page {string} from table in the page list", async function (pageName) {
  if (aPrioriTitle.length > 255 || specialCharRgx.test(aPrioriTitle) || emojiRgx.test(aPrioriTitle)) {
    return;
  }

  if (pageName === "") {
    pageName = "(Untitled)";
  }

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

Then("I visualize the dom matches the HTML {string}", async function (html) {
  if (html == "Bear") {
    html = htmlBear;
  }

  let { elements, text } = GetHtmlTagsAndStyleFromText(html);

  let matchAll = true;

  for (let i = 0; i < elements.length; i++) {
    let htmlElement = elements[i];
    let tag = htmlElement[0];
    let style = htmlElement[1];

    let selector = '';
    if (style.length == 0) {
      selector = tag;
    } else {
      selector = tag + '[' + style + ']';
    }

    let domElement = await this.driver.$(selector);
    if (domElement === undefined) {
      matchAll = false;
      break;
    }

    if (i == elements.length - 1) {
      let domText = await domElement.getText();
      if (domText != text) {
        matchAll = false;
      }
    }
  }

  expect(matchAll).to.be.true;
});

Then("I visualize the card element displayed {string}", async function (option) {
  let element = await this.driver.$(cardOptionElementSelector[option]);
  chai.assert.notEqual(element, undefined);
});