const { Given, When, Then } = require('@cucumber/cucumber');

When('I go to the members section with selector {string}', async function (string) {
  let element = await this.driver.$(string);
  return await element.click();
});

When('I click in the new member button with selector {string}', async function (string) {
  let element = await this.driver.$(string);
  return await element.click();
});

When('I enter a name {kraken-string} into a field with selector {string}',
  async function (string, string2) {
    let title = await this.driver.$(`#${string2}`);
    return await title.setValue(string);
  }
);

When('I enter a valid email {kraken-string} into a field with selector {string}',
  async function (string, string2) {
    let title = await this.driver.$(`#${string2}`);
    return await title.setValue(string);
  }
);

When('I try to save the member by pressing the save button {string}', async function (string) {
  let element = await this.driver.$(string);
  return await element.click();
});

Then('I must see the member listed in the members list section {string}', async function (string) {
  return await this.driver.$(string).getText();
});