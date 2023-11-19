exports.PostPageObject = class PostPageObject {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async newPostButton() {
    await this.page.locator("section.view-actions a[href='#/editor/post/']").click();
  }

  async postListButton() {
    await this.page.locator("li[data-test-post-id]").click();
  }

  async enterTitle(title) {
    await this.page.locator("textarea.gh-editor-title").fill("",);
    await this.page.locator("textarea.gh-editor-title").fill(`${title}`);
    await this.page.keyboard.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  async publishPostLater() {
    // PULISH
    await this.page.locator('button.gh-publish-trigger').click();
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

  async publishPostLaterTestVersion() {
    // PULISH
    await this.page.locator('div.gh-publishmenu-trigger').click();
    await this.page.waitForSelector(".gh-publishmenu-dropdown");
    await this.page.waitForLoadState("domcontentloaded");

    //MODAL
    await this.page.locator(".gh-publishmenu-radio.active div.gh-publishmenu-radio-label").click();
    await this.page.waitForLoadState("domcontentloaded");

     await this.page.locator(".gh-publishmenu-footer button.gh-publishmenu-button").click();
     await this.page.waitForLoadState("domcontentloaded");

     await this.page.locator(".modal-footer .gh-btn-icon").click();
     await this.page.waitForLoadState("domcontentloaded");

    await this.page.locator('.gh-editor-header a[href="#/posts/"]').click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForSelector(".posts-list");
  }
  

  async publishPostRightNow(title) {
    // PULISH
    await this.page.locator('button.gh-publish-trigger').click();
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

  async publishPostRightNowTestVersion() {
    // PULISH
    await this.page.locator('div.gh-publishmenu-trigger').click();
    await this.page.waitForSelector(".gh-publishmenu-dropdown");
    await this.page.waitForLoadState("domcontentloaded");

     await this.page.locator(".gh-publishmenu-footer button.gh-publishmenu-button").click();
     await this.page.waitForLoadState("domcontentloaded");

     await this.page.locator(".modal-footer .gh-btn-icon").click();
     await this.page.waitForLoadState("domcontentloaded");

    await this.page.locator('.gh-editor-header a[href="#/posts/"]').click();
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

  async findPostByTitleTestVersion(title) {
    const list = await this.page.locator("li.gh-posts-list-item .gh-content-entry-title").all();
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

  async openAnalyticsOfAPostByNameTestVersion(title) {
    const list = await this.page.locator("li.gh-posts-list-item").all();
    let wasOpened = false;
    for (let item of list) {
        let postTitle = await item.locator(".gh-content-entry-title").innerText();
        if (postTitle.includes(title)) {
           wasOpened = await item.locator("a.gh-post-list-button:nth-child(4)").first().isVisible();
           if (wasOpened){
              break;
           }
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

  async isPreviewPostButtonAvailable() {
    return await this.page.locator('button[data-test-button="publish-preview"]').isVisible();
  }

  async goBackToPost() {
    await this.page.locator('header a[href="#/posts/"]').click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForSelector(".posts-list");
  }
};

