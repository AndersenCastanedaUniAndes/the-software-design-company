const { Before, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const chai = require('chai');
const should = chai.should();

let tag = ''

Before(function (scenario) {
  tag = scenario?.gherkinDocument.feature.tags[0].name
});

When(
  'I go to the posts section with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  'I click in the new post button with selector {string}',
  async function (string) {
    console.log(tag)
    let element = await this.driver.$(string)[1];
    return await element.click();
  }
);


When(
  'I go back to the list of posts clicking the posts button with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

Then(
  'I validate that the title of the post was modified successfully with {kraken-string}',
  async function (string) {
    let foundPage = false;
    let elements = await this.driver.$$(
      'li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status'
    );

    for (const element of elements) {
      let name = await element.$('a').getText();
      if (name.startsWith(string)) {
        foundPage = true;
        break;
      }
    }
    expect(foundPage).to.be.true;
  }
);

When('I click in the Publish button', async function () {
  let element = await this.driver.$('button[data-test-button="publish-flow"]');
  return await element.click();
});

When('I click in the Right now button', async function () {
  let element = await this.driver.$$('button.gh-publish-setting-title')[2];
  return await element.click();
});

When(
  'I click in the shedule later button with selector {string}',
  async function (string) {
    let element = await this.driver.$$(string)[1];
    return await element.click();
  }
);

When(
  'I click in the Publish post confirm button with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

Then('I validate that the post was sheduled successfully', async function () {
  let element = await this.driver.$('a.gh-post-list-title span.scheduled');
  expect((await element.getText()).toLowerCase()).to.equal(
    'Scheduled'.toLowerCase()
  );
});

When(
  'I click the post in order to edit it {kraken-string}',
  async function (string) {
    let elementFound;
    let elements = await this.driver.$$(
      'li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status'
    );

    for (const element of elements) {
      let name = await element.$('a').getText();
      if (name.startsWith(string)) {
        elementFound = element.$$('a')[0];
        break;
      }
    }
    return await elementFound.click();
  }
);

Then(
  'I update the post by clicking the Update button with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

Then(
  'I see the preview of the post on a div with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    should.exist(element);
  }
);

Then(
  'I click the analytics button associated to the post {kraken-string}',
  async function (string) {
    let elements = await this.driver.$$(
      'li.gh-list-row.gh-posts-list-item.gh-post-list-plain-status'
    );
    let elementFound;
    for (const element of elements) {
      let name = await element.$('a').getText();

      if (name.startsWith(string)) {
        elementFound = element.$$('a')[2];
        break;
      }
    }

    return await elementFound.click();
  }
);

Then(
  'I check the analytics panel opens with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    should.exist(element);
  }
);
