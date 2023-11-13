const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const chai = require('chai');
const should = chai.should();

When(
  'I go to the tags section with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  'I click new tag button with selector {string}',
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
  'I go back to the tags section clicking the tags button with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

Then(
  'I validate that the title of the tag was modified successfully with {string}',
  async function (string) {
    let element = await this.driver.$('li.gh-list-row a h3.gh-tag-list-name');
    expect(await element.getText()).to.equal(string);
  }
);

When('I click in the save button', async function () {
  let element = await this.driver.$('button[data-test-button="save"]');
  return await element.click();
});

When(
  'I go back to the editor section clicking the editor button with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When('I click the new tag in order to edit it {string}', async function (name) {
  let element = await this.driver.$(`a[href="#/tags/${name}/"]`);
  return await element.click();
});


Then(
  'I check the analytics panel opens with selector {string}',
  async function (string) {
    let element = await this.driver.$(string);
    should.exist(element);
  }
);

When('I click the new tag in order to delete it {string}', async function (name) {
  let element = await this.driver.$(`a[href="#/tags/${name}/"]`);
  return await element.click();
});


When(
  'I click in the delete button with selector {string}',
  async function (selector) {
    let deleteButton = await this.driver.$(selector);
    return await deleteButton.click();
  }
);

Then("I must see an success name advise {string}", async function (string) {
  return await this.driver.$(string).getText();
});