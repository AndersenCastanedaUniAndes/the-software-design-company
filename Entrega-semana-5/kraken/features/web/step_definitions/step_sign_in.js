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