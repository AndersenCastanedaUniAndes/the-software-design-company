
require("dotenv").config();
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
    await this.page.locator('a[href="#/members/"]').click();
  }

  async clickOnNewMemberViewLink(){
    await this.page.locator('a[href="#/members/new/"]').click();
  }

   async clickOnPostsViewLink(){
    await this.page.locator('a[data-test-nav="posts"]').click();
  }

  async clickOnPagesViewLink(){
    await this.page.locator('a[data-test-nav="posts"]').click();
  }

  async screenshot(section){
    let datetime = new Date().toISOString().replace(/:/g,".");
    const path = `./VTK/screenshots/${section ?? "default"}-${datetime}.png`
    await this.page.screenshot({path:path});
  }
};