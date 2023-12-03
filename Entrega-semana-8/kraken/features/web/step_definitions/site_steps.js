const { Before, Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("chai");
const chai = require("chai");
const should = chai.should();


When("I navigate to {string} with specific selector {string}", async function(_, selector) {
    let element = await this.driver.$(selector);
    await element.click();
});

When("I navigate to {string} with specific selector {string} to set Value {string}", async function(_, selector, value) {
    let element = await this.driver.$(selector);
    await element.setValue(value);
    return await this.driver.keys("Enter"), this.driver.keys("Enter");
});

Then("I validate that the signin button has color {string}", async function(value) {
    let element = await this.driver.$(`button[style="background: #${value};"]`);
    expect(element).to.exist;
});

Then("I validate that the site background color is {string}", async function(value) {
    let element = await this.driver.$("head > style:nth-child(7)");
    let text = await element.getText();
    expect(text.includes(`--background-color: #${value}`)).to.be.true;
});

Then("I validate that the site navbar has {string}", async function(name) {
    let element = await this.driver.$(`li[class='nav-${name.toLowerCase()}']`);
    expect(element).to.exist;
});
