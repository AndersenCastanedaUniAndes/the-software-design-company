exports.MemberPageObject = class MemberPageObject {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async clickOnMembersViewLink() {
    await this.page.locator('.relative a[href="#/members/"]').click();
  }

  async clickOnNewMemberViewLink() {
    await this.page.locator('a[href="#/members/new/"]').click();
  }

  async getMembersTable() {
    return await this.page.locator("table.gh-list tbody.ember-view tr a p.gh-members-list-email").all();
  }

  async getEmailErrorMessage() {
    return await this.page.locator("div.gh-cp-member-email-name .form-group.max-width.error p").innerText();
  }

  async getNoteErrorMessage() {
    return await this.page.locator("div.gh-member-note.error p.response").innerText();
  }

  async clickOnSaveButton() {
    await this.page.locator(".view-actions button").click();
    await this.page.waitForLoadState('networkidle')
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
};
