const { When, Then } = require("@cucumber/cucumber");

When("I go to the members section with selector {string}", async function (string) {
  let element = await this.driver.$(string);
  return await element.click();
});

When("I click in the new member button with selector {string}", async function (string) {
  let element = await this.driver.$(string);
  return await element.click();
});

When("I enter a name {kraken-string} into a field with selector {string}", async function (string, string2) {
  let title = await this.driver.$(`#${string2}`);
  return await title.setValue(string);
});

When("I enter a valid email {kraken-string} into a field with selector {string}", async function (string, string2) {
  let emailField = await this.driver.$(`#${string2}`);
  return await emailField.setValue(string);
});

When("I enter a ramdom email {kraken-string} into a field with selector {string}", async function (string, string2) {
  let emailField = await this.driver.$(`#${string2}`);
  return await emailField.setValue(string);
});

When("I enter an existing valid email {kraken-string} into a field with selector {string}", async function (string, string2) {
  let emailField = await this.driver.$(`#${string2}`);
  return await emailField.setValue(string);
});

When("I enter a invalid email {kraken-string} into a field with selector {string}", async function (string, string2) {
  let emailField = await this.driver.$(`#${string2}`);
  return await emailField.setValue(`${string}-98987`);
});

When("I do not enter a valid email into a field with selector {string}", async function (string2) {
  let emailField = await this.driver.$(`#${string2}`);
  return await emailField.setValue("");
});

When("I enter a note with more than 500 characters into a field with selector {string}", async function (string) {
  let noteField = await this.driver.$(`#${string}`);
  return await noteField.setValue(
    "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas 'Letraset', las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
  );
});

When("I try to save the member by pressing the save button {string}", async function (string) {
  let element = await this.driver.$(string);
  return await element.click();
});

Then("I must see the member listed in the members list section {string}", async function (string) {
  return await this.driver.$(string).getText();
});

Then("I must see an invalid email error {string}", async function (string) {
  return await this.driver.$(string).getText("Invalid Email.");
});

Then("I must see an empty email error with selector {string}", async function (string) {
  return await this.driver.$(string).getText("Please enter an email.");
});

Then("I must see a too many characters note error with selector {string}", async function (string) {
  return await this.driver.$(string).getText("Note is too long.");
});

Then("I must see an already exists member error with selector {string}", async function (string) {
  return await this.driver.$(string).getText("Member already exists. Attempting to add member with existing email address");
});
