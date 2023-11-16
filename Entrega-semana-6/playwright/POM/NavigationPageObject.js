
exports.NavigationPageObject = class NavigationPageObject {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
     this.page = page;
  }

  async goToRoot() {
    return await this.page.goto('ghost/#/signin');
  }

  async clickOnMembersViewLink(){
    await this.page.locator('.relative a[href="#/members/"]').click();
  }

  async clickOnNewMemberViewLink(){
    await this.page.locator('a[href="#/members/new/"]').click();
  }
};