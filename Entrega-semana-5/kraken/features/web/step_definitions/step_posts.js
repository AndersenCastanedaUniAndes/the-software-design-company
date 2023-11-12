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
