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
        await this.page.locator('button[data-test-button="save"]').click();
      }
    
    async enterName(name) {
      await this.page.locator("input[id='tag-name']").fill(`${name}`);
    }
  
    async goBackToTags() {
        await this.page.locator('a[data-test-link="tags-back"]').click();
      }

    async selectCreatedTag(tag){
        await this.page.locator(`a[href="#/tags/${tag}/"].ember-view.gh-list-data.gh-list-cellwidth-10.gh-list-chevron`).click();
    }  

    async selectCreatedInternalTag(tagName){
        await this.page.locator(`a[href="#/tags/hash-${tagName}/"].ember-view.gh-list-data.gh-list-cellwidth-10.gh-list-chevron`).click();
    }  

    async successSavedButton(){
        let savedBotton = await this.page.locator("button[data-test-button='save']").innerText();
        return savedBotton;
    }

    async deleteTagButton(){
        await this.page.locator('button[data-test-button="delete-tag"]').click();
        await this.page.locator('button[data-test-button="confirm"]').click();
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
        let message = await this.page.locator('body > div.gh-app > div > main > section > form > div.gh-main-section > section > div > div:nth-child(1) > div.gh-tag-settings-multiprop > div.form-group.mr2.flex-auto.error > span > p:nth-child(1)').innerText();
        return message;
    }
}