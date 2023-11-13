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

When('I click the editor button associated to the post', async function () {
  let element = await this.driver.$$('a.gh-post-list-button')[0];
  return await element.click();
});

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

When('I click the new tag in order to edit it {string}', async function (name) {
  let element = await this.driver.$(`a[href="#/tags/${name}/"]`);
  return await element.click();
});

// Then(
//   'I visualize {string} with {string} tag in the list with selector {string}',
//   async function (tagName, tag, selector) {
//     let foundTag = false;
//     let tags = await this.driver.$$(selector);

//     for (let i = 0; i < tags.length; i++) {
//       let name = await tags[i].getText();

//       if (name.startsWith(tagName) && name.includes(tag)) {
//         foundTag = true;
//         break;
//       }
//     }

//     expect(foundTag).to.be.true;
//   }
// );

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