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
  'I go to internal tags section with selector {string}',
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

When('I click the new tag in order to edit it {kraken-string}', async function (name) {
  let nameModified = name.charAt(0).toLowerCase() + name.slice(1);
  let element = await this.driver.$(`a[href="#/tags/${nameModified}/"]`);
  return await element.click();
});

When('I click the new tag in order to edit this internal tag {kraken-string}', async function (name) {
  let nameModified = name.charAt(0).toLowerCase() + name.slice(1);
  let element = await this.driver.$(`a[href="#/tags/hash-${nameModified}/"]`);
  return await element.click();
});


When('I click the new tag in order to delete it {kraken-string}', async function (name) {
  let nameModified = name.charAt(0).toLowerCase() + name.slice(1);
  let element = await this.driver.$(`a[href="#/tags/${nameModified}/"]`);
  return await element.click();
});

When('I click the new tag in order to delete this internal tag {kraken-string}', async function (name) {
  let nameModified = name.charAt(0).toLowerCase() + name.slice(1);
  let element = await this.driver.$(`a[href="#/tags/hash-${nameModified}/"]`);
  return await element.click();
});

When(
  'I click in the delete tag button with selector {string}',
  async function (selector) {
    let deleteButton = await this.driver.$(selector);
    return await deleteButton.click();
  }
);

When(
  'I click in the confirm delete button with selector {string}',
  async function (selector) {
    let deleteButton = await this.driver.$(selector);
    return await deleteButton.click();
  }
);

When(
  'I enter internal title {kraken-string} into field with selector {string}',
  async function (string, string2) {
    let title = await this.driver.$(string2);
    await title.setValue(`#${string}`);
    return await this.driver.keys('Enter');
  }
);

Then("I must see an success name advise {string}", async function (expectedText) {
  let button = await this.driver.$("button[data-test-button='save']")
  const buttonText = await button.getText();

  expect(buttonText).to.equal(expectedText);
});

Then(
  'I validate that the title of the tag does not appear in the tag list {kraken-string}',
  async function (string) {
    let element = await this.driver.$('li.gh-list-row a h3.gh-tag-list-name');
    expect(await element.getText()).to.equal(string);
  }
);

Then(
  'I validate that the element {kraken-string} is not present in the list',
  async function (deletedElement) {
    const list = await this.driver.$$('ol.tags-list.gh-list'); // Selector lista de tags
    let deletedModified = `#${deletedElement}`
    let isElementPresent = false;
    for (let i = 0; i < list.length; i++) {
      const text = await list[i].getText();
      if (text === deletedModified) {
        isElementPresent = true;
        break;
      }
    }

    expect(isElementPresent).to.be.false;
  }
);

Then(
  'I must see an invalid name error {string}',
  async function (invalidNameError){
    const warningElement = await this.driver.$('span.error p.response').getText();

    expect(warningElement).to.equal(invalidNameError);
  }
)