const { expect } = require('@playwright/test');

exports.AuthorizationPageObject = class AuthorizationPageObject {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
     this.page = page;
  }

  async fillOutUsername(email){
     return await this.page.locator("input#identification").fill(email)
  }

  async fillOutPassword(password){
    return await this.page.locator("input#password").fill(password)
  }

  async submit() {
     await this.page.locator("form.gh-signin button[data-test-button='sign-in']").click()
     await this.page.waitForURL('**/dashboard');
  }
};