
exports.PostPageObject = class PostPageObject {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async newPostButton() {
    await this.page.locator('a[data-test-new-post-button]').click();
  }

  async postListButton() {
    await this.page.locator('li[data-test-post-id]').click();
  }

  async enterTitle(title){
    await this.page.locator('textarea[data-test-editor-title-input]').fill('');
    await this.page.locator('textarea[data-test-editor-title-input]').fill(`${title}`);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async publishPostLater(title){
    // PULISH
    await this.page.locator('button[data-test-button="publish-flow"]').click();
    await this.page.waitForSelector(".gh-publish-settings-container");

    //MODAL
    await this.page.locator("button[data-test-setting-title]").last().click();

    //SCHEDULE LATER BUTTON
    const childSelector = 'div[data-test-radio="schedule"]';
    await this.page.locator(`${childSelector} >> xpath=..`).click();

    //CONTINUE TO FINAL STEP
    await this.page.locator('button[data-test-button="continue"]').click();
    await this.page.waitForSelector(".gh-publish-settings-container");
    await this.page.waitForLoadState("domcontentloaded");

    //PUBLISH
    await this.page.locator('button[data-test-button="confirm-publish"]').click({ force: true });
    await this.page.waitForLoadState("domcontentloaded");

    //GO BACK
    await this.page.locator('button[data-test-button="close-publish-flow"]').click({ force: true });
    await this.page.waitForLoadState("domcontentloaded");

    await this.page.locator('a[data-test-link="posts"]').click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForSelector(".posts-list");
  }
};
