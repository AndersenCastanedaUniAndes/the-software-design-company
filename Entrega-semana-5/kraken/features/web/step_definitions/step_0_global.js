const { Given, When, Then } = require('@cucumber/cucumber');

When('I enter email {kraken-string}', async function (email) {
  let usernameInput = await this.driver.$('#identification');
  return await usernameInput.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
  let passwordInput = await this.driver.$('#password');
  return await passwordInput.setValue(password);
});

When('I click sign in button with selector {string}', async function(string) {
  let singInButton = await this.driver.$(string);
  return await singInButton.click();
})

When(
  'I enter title {kraken-string} into field with selector {string}',
  async function (string, string2) {
    let title = await this.driver.$(string2);
    await title.setValue(string);
    return await this.driver.keys('Enter');
  }
);