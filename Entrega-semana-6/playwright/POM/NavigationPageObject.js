
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

   async clickOnPostsViewLink(){
    await this.page.locator('a[data-test-nav="posts"]').click();
  }

  async clickOnPagesViewLink(){
    await this.page.locator('a[data-test-nav="posts"]').click();
  }

  async clickOnTagsViewLink(){
    await this.page.locator('a[href="#/tags/"]').click();
  }

  async clickOnInternalTagViewLink(){
    await this.page.locator('button[data-test-tags-nav="internal"]').click();
  }
  
  async screenshot(){
    let datetime = new Date().toISOString().replace(/:/g,".");
    await this.page.screenshot({path:`./screenshots/${datetime}.png`});
  }
};