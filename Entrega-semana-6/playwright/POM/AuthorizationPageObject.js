const { expect } = require('@playwright/test');

exports.AuthorizationPageObject = class AuthorizationPageObject {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
     this.page = page;
  }

  async fillOutUsername(email){
     return await this.page.locator("input[name='identification']").fill(email)
  }

  async fillOutPassword(password){
    return await this.page.locator("input[name='password']").fill(password)
  }

  async submit() {
     await this.page.locator("button[type='submit']").click()
  }
};