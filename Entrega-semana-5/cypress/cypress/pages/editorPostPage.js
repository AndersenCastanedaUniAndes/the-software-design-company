import PostsPage from './postsPage';
import MainPage from './mainPage';
class PublishPostPage extends MainPage {
  elements = {
    continueFinalReviewButton: () =>
      cy.get('button[data-test-button="continue"]'),
    rightNowButton: () => cy.get('button[data-test-setting-title]').last(),
    scheduleForLaterButton: () =>
      cy.get('div[data-test-radio="schedule"]').parent(),
    publishButton: () => cy.get('button[data-test-button="confirm-publish"]'),
    goBackToEditorButton: () =>
      cy.get('button[data-test-button="close-publish-flow"]'),
  };

  clickContinueFinalReview() {
    this.elements.continueFinalReviewButton().click();
    this.takeScreenshot()
    return this;
  }

  clickPublish() {
    this.elements.publishButton().click();
    this.takeScreenshot()
    return this;
  }

  clickRightNow() {
    this.elements.rightNowButton().click();
    this.takeScreenshot()
    return this;
  }

  clickScheduleForLater() {
    this.elements.scheduleForLaterButton().click();
    this.takeScreenshot()
    return this;
  }

  clickGoBackToEditor() {
    this.elements.goBackToEditorButton().click();
    this.takeScreenshot()
  }
}

class previewPostPage extends MainPage {
  elements = {
    preview: () =>
      cy.get('div.gh-post-preview-container.gh-post-preview-browser-container'),
  };

  getPreview() {
    return this.elements.preview;
  }
}

class EditorPostPage extends MainPage  {
  constructor() {
    super(); 
    this.publishModal = new PublishPostPage();
  }

  elements = {
    postTitleTextarea: () => cy.get('textarea[data-test-editor-title-input]'),
    goBackToPostsButton: () => cy.get('a[data-test-link="posts"]'),
    previewButton: () => cy.get('button[data-test-button="publish-preview"]'),
    publishButton: () => cy.get('button[data-test-button="publish-flow"]'),
    updateButton: () => cy.get('button[data-test-button="publish-save"]'),
  };

  enterTitle(title) {
    this.elements.postTitleTextarea().clear();
    this.elements.postTitleTextarea().type(title);
    this.elements.postTitleTextarea().type('{enter}');
    this.takeScreenshot()
    return this;
  }

  clickgoBackToPosts() {
    this.elements.goBackToPostsButton().click();

    const postsPage = new PostsPage();
    this.takeScreenshot()
    return postsPage;
  }

  publishPostRightNow() {
    this.elements.publishButton().click();
    this.publishModal
      .clickContinueFinalReview()
      .clickPublish()
      .clickGoBackToEditor();
      this.takeScreenshot()
    return this;
  }

  publishPostLater() {
    this.elements.publishButton().click();
    this.publishModal
      .clickRightNow()
      .clickScheduleForLater()
      .clickContinueFinalReview()
      .clickPublish()
      .clickGoBackToEditor();
      this.takeScreenshot()
    return this;
  }

  ClickUpdatePost() {
    this.elements.updateButton().click();
    this.takeScreenshot()
    return this;
  }

  clickPreviewPost() {
    this.elements.previewButton().click();
    const previewObj = new previewPostPage();
    this.takeScreenshot()
    return previewObj;
  }
}

export default EditorPostPage;
