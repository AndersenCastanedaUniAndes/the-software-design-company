require("dotenv").config();
exports.NavigationPageObject = class NavigationPageObject {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async goToRoot() {
    return await this.page.goto("ghost/#/signin");
  }

  async clickOnMembersViewLink() {
    await this.page.locator('.relative a[href="#/members/"]').click();
  }

  async clickOnNewMemberViewLink() {
    await this.page.locator('a[href="#/members/new/"]').click();
  }

  async clickOnPostsViewLink() {
    await this.page.locator('li a[href="#/posts/"]').click({ force: true });
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickOnPagesViewLink() {
    await this.page.locator('a[href="#/pages/"]').click({ force: true });
  }

  async clickOnTagsViewLink(){
    await this.page.locator('li a[href="#/tags/"]').click({ force: true });
    await this.page.waitForLoadState("domcontentloaded");
  }

  async screenshot(section) {
    const REFERENCE_VERSION = process.env.REFERENCE_VERSION;
    const TEST_VERSION = process.env.TEST_VERSION;
    const ACTIVE_VERSION = process.env.ACTIVE_VERSION;
    let PATH = ""
    if (ACTIVE_VERSION === REFERENCE_VERSION) {
      PATH = process.env.REFERENCE_IMAGES;
    }
    if (ACTIVE_VERSION === TEST_VERSION) {
      PATH = process.env.TESTS_IMAGES;
    }
    let datetime = new Date().toISOString().replace(/:/g, ".");
    const path = `${PATH}${section ?? "default"}-${datetime}.png`;

    await this.page.screenshot({ path: path });
  }

   async clickOnInternalTagViewLink(){
    await this.page.locator('section.view-actions > div button:nth-child(2)').click();
    await this.page.waitForSelector(".tags-list");
  }
};
