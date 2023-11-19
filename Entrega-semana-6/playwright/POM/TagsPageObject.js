exports.TagsPageObject = class PostPageObject {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
    }
  
    async newTagButton(){
        await this.page.locator('a[href="#/tags/new/"].ember-view.gh-btn.gh-btn-primary').click();
      }
  
    async saveTagButton(){
        await this.page.locator('section.view-actions button.gh-btn').click();
    }
    
    async enterName(name) {
      await this.page.locator("input#tag-name").fill(`${name}`);
    }
  
    async goBackToTags() {
        await this.page.locator('div.gh-canvas-header a[href="#/tags/"]').click();
    }

    async goBackToInternalTags() {
        await this.page.locator('div.gh-canvas-header a[href="#/tags/?type=internal"]').click();
    }

    async selectCreatedTag(tag){
        await this.page.locator(`a[href="#/tags/${tag}/"].ember-view.gh-list-data.gh-list-cellwidth-10.gh-list-chevron`).click();
    }  

    async selectCreatedInternalTag(tagName){
    const list = await this.page.locator("ol.tags-list li.gh-tags-list-item a.gh-tag-list-title").all();
        let wasOpened = false;
        for (let item of list) {
          if (wasOpened) continue;

          let postTitle = await item.locator("h3.gh-tag-list-name").innerText();
          if (postTitle.includes(tagName)) {
             await item.click();
             await this.page.waitForLoadState("domcontentloaded");
             wasOpened = true;
          }
          
        }
        return wasOpened;
    }  

    async successSavedButton(){
        let savedBotton = await this.page.locator("section.view-actions button.gh-btn").innerText();
        return savedBotton;
    }

    async deleteTagButton(){
        await this.page.locator('section.gh-canvas > div > button.gh-btn-red').click();
        await this.page.waitForLoadState("domcontentloaded");
        await this.page.locator('.modal-content div.modal-footer .gh-btn-red').first().click();
    }

    async findDeletedTagByName(name) {
        const list = await this.page.locator("ol[data-test-post-id]").all();
        let wasDeleted = true;
        for (let item of list) {
          let tagTitle = await item.innerText();
          if (tagTitle.includes(name)) {
            wasDeleted = false;
          }
        }
        return wasDeleted;
      }

    async invalidTagNameError(){
        let message = await this.page.locator('div.gh-tag-settings-multiprop div:nth-child(1) span.error p.response:nth-child(1)').innerText();
        return message;
    }
}