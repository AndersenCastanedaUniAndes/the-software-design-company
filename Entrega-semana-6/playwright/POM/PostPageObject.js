exports.PostPageObject = class PostPageObject {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async newPostButton() {
    await this.page.locator("a[data-test-new-post-button]").click();
  }

  async postListButton() {
    await this.page.locator("li[data-test-post-id]").click();
  }

  async enterTitle(title) {
    await this.page.locator("textarea[data-test-editor-title-input]").fill("");
    await this.page.locator("textarea[data-test-editor-title-input]").fill(`${title}`);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  async publishPostLater(title) {
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

  async publishPostRightNow(title) {
    // PULISH
    await this.page.locator('button[data-test-button="publish-flow"]').click();
    await this.page.waitForSelector(".gh-publish-settings-container");

    //MODAL
    await this.page.locator("button[data-test-setting-title]").last().click();

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

  async findPostByTitle(title) {
    const list = await this.page.locator("li[data-test-post-id] .gh-content-entry-title").all();
    let wasCreated = false;
    for (let item of list) {
      let postTitle = await item.innerText();
      if (postTitle.includes(title)) {
        wasCreated = true;
      }
    }
    return wasCreated;
  }

  async showPostByTitle(title) {
    let wasOpened = false;
    const list = await this.page.locator("li[data-test-post-id]").all();
    for (let item of list) {
      let postTitle = await item.locator(".gh-content-entry-title").innerText();
      if (postTitle.includes(title)) {
        await item.click();
        await this.page.waitForLoadState("domcontentloaded");
        wasOpened = true;
        break;
      }
    }
    return wasOpened;
  }

  async openAnalyticsOfAPostByName(title) {
    let wasOpened = false;
    const list = await this.page.locator("li[data-test-post-id]").all();
    for (let item of list) {
      let postTitle = await item.locator(".gh-content-entry-title").innerText();
      if (postTitle.includes(title)) {
        await item.locator("a:nth-child(4)").first().click();
        await this.page.waitForLoadState("domcontentloaded");
        wasOpened = true;
        break;
      }
    }
    return wasOpened;
  }

  async wasPostScheduled(title) {
    let wasScheduled = false;
    const list = await this.page.locator("li[data-test-post-id]").all();
    for (let item of list) {
      let postTitle = await item.locator(".gh-content-entry-title").innerText();
      if (postTitle.includes(title)) {
        const label = await item.locator("a:nth-child(1)").locator("p:nth-child(3)").first().innerText();
        await this.page.waitForLoadState("domcontentloaded");
        wasScheduled = label.includes('Scheduled');
        break;
      }
    }
    return wasScheduled;
  }

  async clickPreviewPost() {
    await this.page.locator('button[data-test-button="publish-preview"]').click();
    await this.page.waitForSelector(".gh-post-preview-container");
    return await this.page.isVisible("div.gh-post-preview-container.gh-post-preview-browser-container");
  }

  async goBackToPost() {
    await this.page.locator('a[data-test-link="posts"]').click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForSelector(".posts-list");
  }
};
