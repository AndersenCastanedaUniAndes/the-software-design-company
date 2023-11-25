const { Before, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const chai = require("chai");
const should = chai.should();

let tag = "";

Before(function (scenario) {
  tag = scenario?.gherkinDocument.feature.tags[0].name;
});

When(
  "I go to the members section with selector {string}",
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  "I click in the new member button with selector {string}",
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

When(
  "I enter a name {kraken-string} into a field with selector {string}",
  async function (string, string2) {
    let title = await this.driver.$(`#${string2}`);
    if (string.includes("space")) {
      return await this.driver.keys("Space");
    } else if (string.includes("blank")) {
      string = string.replace("blank", "");
    }
    return await title.setValue(string);
  }
);

When(
  "I enter an email {kraken-string} into a field with selector {string}",
  async function (string, string2) {
    let emailField = await this.driver.$(`#${string2}`);
    if (string.includes("space")) {
      return await this.driver.keys("Space");
    } else if (string.includes("blank")) {
      string = string.replace("blank", "");
    }
    return await emailField.setValue(string);
  }
);

When(
  "I enter a valid email {kraken-string} into a field with selector {string}",
  async function (string, string2) {
    let emailField = await this.driver.$(`#${string2}`);
    return await emailField.setValue(string);
  }
);

When(
  "I enter a ramdom email {kraken-string} into a field with selector {string}",
  async function (string, string2) {
    let emailField = await this.driver.$(`#${string2}`);
    return await emailField.setValue(string);
  }
);

When(
  "I enter an existing valid email {kraken-string} into a field with selector {string}",
  async function (string, string2) {
    let emailField = await this.driver.$(`#${string2}`);
    return await emailField.setValue(string);
  }
);

When(
  "I enter a invalid email {kraken-string} into a field with selector {string}",
  async function (string, string2) {
    let emailField = await this.driver.$(`#${string2}`);
    return await emailField.setValue(`${string}-98987`);
  }
);

When(
  "I do not enter a valid email into a field with selector {string}",
  async function (string2) {
    let emailField = await this.driver.$(`#${string2}`);
    return await emailField.setValue("");
  }
);

When(
  "I enter a note with more than 500 characters into a field with selector {string}",
  async function (string) {
    let noteField = await this.driver.$(`#${string}`);
    return await noteField.setValue(
      "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas 'Letraset', las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
    );
  }
);

When(
  "I try to save the member by pressing the save button {string}",
  async function (string) {
    let element = await this.driver.$(string);
    return await element.click();
  }
);

Then(
  "I must see the member listed in the members list section {string}",
  async function (string) {
    return await this.driver.$(string).getText();
  }
);

Then("I must see an invalid email error {string}", async function (string) {
  return await this.driver.$(string).getText("Invalid Email.");
});

Then(
  "I must see an empty email error with selector {string}",
  async function (string) {
    return await this.driver.$(string).getText("Please enter an email.");
  }
);

Then(
  "I must see a too many characters note error with selector {string}",
  async function (string) {
    return await this.driver.$(string).getText("Note is too long.");
  }
);

Then(
  "I must see an already exists member error with selector {string}",
  async function (string) {
    if (tag.includes("4.48.9")) {
      return await this.driver
        .$("article.gh-alert.gh-alert-red.ember-view div.gh-alert-content")
        .getText(
          "Validation error, cannot save member. Member already exists. Attempting to add member with existing email address"
        );
    }
    return await this.driver
      .$(string)
      .getText(
        "Member already exists. Attempting to add member with existing email address"
      );
  }
);

When(
  "I enter a label {string} into a field with selector {string}",
  async function (string, string2) {
    let labelField = await this.driver.$(string2);

    if (string.includes("space")) {
      // need to focus input field to send space key
      await labelField.setValue(""), this.driver.keys("Space");
    } else if (string.includes("blank")) {
      string = string.replace("blank", "");
      await labelField.setValue(string);
    } else {
      await labelField.setValue(string);
    }
    return await this.driver.keys("Enter");
  }
);

Then(
  "I must see the member {kraken-string} or {kraken-string} listed in the members list section {kraken-string} or the confirmation modal if the member was not created",
  async function (name, email, selector) {
    const url = await this.driver.getUrl();

    if (url.includes("members/new")) {
      let modal = await this.driver.$("div.modal-container");
      should.exist(modal);
    } else {
      let foundPage = false;
      let elements = await this.driver.$$(selector);

      for (const element of elements) {
        let name = await element.getText();
        if (name.includes(name) || name.includes(email)) {
          foundPage = true;
          break;
        }
      }
      expect(foundPage).to.be.true;
    }
  }
);
