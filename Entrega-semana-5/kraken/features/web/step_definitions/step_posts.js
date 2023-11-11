const { Given, When, Then } = require('@cucumber/cucumber');

When('I go to the posts section with selector {string}', async function (string) {
  let element = await this.driver.$(string);
  return await element.click();
});

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
    let title = await this.driver.$(`#${string2}`);
    return await title.setValue(string);
  }
);