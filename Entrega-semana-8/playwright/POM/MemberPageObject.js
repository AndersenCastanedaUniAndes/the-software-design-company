exports.MemberPageObject = class MemberPageObject {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async clickOnMembersViewLink() {
    await this.page.locator('a[data-test-nav="members"]').first().click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickOnNewMemberViewLink() {
    await this.page.locator('a[href="#/members/new/"]').click();
    await this.page.waitForLoadState("domcontentloaded");
  }

  async getMembersTable() {
    return await this.page.locator("table.gh-list tbody.ember-view tr a p.gh-members-list-email").all();
  }

  async getEmailErrorMessage() {
    return await this.page.locator("div.gh-cp-member-email-name .form-group.max-width.error p").innerText();
  }

  async getEmailErrorMessageTestVersion() {
    return await this.page.locator(".gh-alert-red .gh-alert-content").first().innerText();
  }

  async getNoteErrorMessage() {
    return await this.page.locator("div.gh-member-note.error p.response").innerText();
  }

  async clickOnSaveButton() {
    await this.page.locator(".view-actions button").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async clickOnSaveButtonByDataTest() {
    await this.page.locator("button[data-test-button='save']").click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForLoadState("domcontentloaded");
  }

  async fillOutName(member) {
    await this.page.locator("input#member-name").fill(member.fullname);
  }

  async fillOutNote(note) {
    await this.page.locator("textarea#member-note").fill(note);
  }

  async onBlurNote() {
    await this.page.locator("textarea#member-note").blur();
  }

  async fillOutEmail(member) {
    await this.page.locator("input#member-email").fill(member.email);
  }

  async isMemberOnTheList(member) {
    const items = await this.getMembersTable();
    let results = {
      found: false,
      item: undefined,
    };
    for (let item of items) {
      const memberEmail = await item.innerText();
      if (memberEmail.includes(member.email)) {
        results.found = true;
        results.item = item;
      }
    }
    return results;
  }

  async openMembersFilterList() {
    await this.page.locator(".view-actions-top-row div[data-test-button='members-filter-actions']").click();
    await this.page.waitForLoadState("domcontentloaded");
    // await this.page.waitForSelector(".gh-filters");
  }

  async applyMembersFilterList() {
    await this.page.locator("button[data-test-button='members-apply-filter']").click({force:true});
  }

  async filterByName(member){
    await this.page.locator("input[data-test-input='members-filter-value']").first().fill(member.fullname);
  }

  async waitForCanvas(){
     return await this.page.waitForSelector(".gh-canvas")
  }

  async waitForMembersList(){
     return await this.page.waitForSelector("table.gh-list");
  }
};
