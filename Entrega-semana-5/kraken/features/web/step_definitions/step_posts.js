const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const chai = require('chai');
const should = chai.should();

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
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  'I enter title {kraken-string} into field with selector {string}',
  async function (string, string2) {
    let title = await this.driver.$(string2);
    await title.setValue(string);
    return await this.driver.keys('Enter');
  }
);

When(
  'I go back to the list of posts clicking the posts button with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When('I click the editor button associated to the post', async function () {
  let element = await this.driver.$$('a.gh-post-list-button')[0];
  return await element.click();
});

Then(
  'I validate that the title of the post was modified successfully with {kraken-string}',
  async function (string) {
    let element = await this.driver.$$('a.gh-post-list-title h3')[0];
    expect(await element.getText()).to.equal(string);
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
  'I click in the Continue, final review button with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
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

When(
  'I go back to the editor section clicking the editor button with selector {string}',
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

When('I click the post in order to edit it', async function () {
  let element = await this.driver.$$('a.gh-list-data.gh-post-list-title')[0];
  return await element.click();
});

Then(
  'I update the post by clicking the Update button with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

Then(
  'I click in the preview button with selector {string}',
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

Then('I click the analytics button associated to the post', async function () {
  let element = await this.driver.$$('a.gh-post-list-button')[0];
  return await element.click();
});

Then(
  'I check the analytics panel opens with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    should.exist(element);
  }
);
