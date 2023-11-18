exports.TagsPageObject = class PostPageObject {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
    }
  
    async newTagButton(){
        await this.page.locator('a[href="#/tags/new/"]').click();
      }
  
    async saveTagButton(){
        await this.page.locator('button[data-test-button="save"]').click();
      }
    
    async enterName(name) {
      await this.page.locator("input[id='tag-name']").fill(`${name}`);
    }
  
    async goBackToTags() {
        await this.page.locator('a[href="#/tags/"]').click();
      }

    async selectCreatedTag(tag){
        await this.page.locator(`a[href="#/tags/${tag}/"]`).click();
    }  

    async selectCreatedInternalTag(tagName){
        await this.page.locator(`a[href="#/tags/hash-${tagName}/"]`).click();
    }  

    async successSavedButton(){
        let savedBotton = await this.page.locator("button[data-test-button='save']").textContent();
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
        let message = await this.page.locator('span.error p.response').textContent;
        return message;
    }
}