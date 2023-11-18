import NavigationSection from './section/navSection';

class PagesPage {
  // constructor() {
  //   this.navigationBar = new NavigationSection();
  // }

  elements = {
    newPageButton: () => cy.get('a[data-test-new-page-button]'),
    pageTitle: () => cy.get('textarea[data-test-editor-title-input]'),
    publishButton: () => cy.get('button[data-test-button="publish-flow"]'),
    continuePublishButton: () => cy.get('button[data-test-button="continue"]'),
    confirmPublishButton: () => cy.get('button[data-test-button="confirm-publish"]'),
    closePublishEditorButton: () => cy.get('button[data-test-button="close-publish-flow"]'),
    toPageListButton: () => cy.get('a[data-test-link="pages"]'),
    pagesList: () => cy.get('div.gh-posts-list-item-group'),
  };

  clickNewPage() {
    let newPage = this.elements.newPageButton();
    newPage.click();

    return this;
  }

  clickEditPage() {

  }

  clickSettings() {

  }

  clickTagDropdown() {

  }

  selectTagOption() {

  }

  leavePage() {

  }

  addPageTitle(newTitle) {
    let title = this.elements.pageTitle();

    title.clear();
    title.type(newTitle);
    title.type('{enter}');

    return this;
  }

  publishPage() {
    let publishButton = this.elements.publishButton();
    publishButton.click();

    return this;
  }

  continuePublish() {
    let continuePublishButton = this.elements.continuePublishButton();
    continuePublishButton.click();

    return this;
  }

  confirmPublish() {
    let confirmPublishButton = this.elements.confirmPublishButton();
    confirmPublishButton.click();

    return this;
  }

  closePublishEditor() {
    let closePublishEditorButton = this.elements.closePublishEditorButton();
    closePublishEditorButton.click();

    return this;
  }

  goBackToPagesList() {
    let pageListButton = this.elements.toPageListButton();
    pageListButton.click();

    return this;
  }

  visualizeNewPageInList() {
    return true;
  }

//   findPostByName(name) {
//     return this.elements.pageList().contains(name);
//   }

//   editPostedPostByName(name) {
//     this.findPostByName(name).click();

//     const editorPostPage = new EditorPostPage();
//     return editorPostPage;
//   }

//   openAnalyticsOfAPostByName(name) {
//     this.findPostByName(name).next().next().next().click();
//     const analytics = new PostAnalyticsPage();
//     return analytics;
//   }
}

export default PagesPage;