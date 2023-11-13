import PostsPage from './postsPage';

class PublishPostPage {
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
    return this;
  }

  clickPublish() {
    this.elements.publishButton().click();
    return this;
  }

  clickRightNow() {
    this.elements.rightNowButton().click();
    return this;
  }

  clickScheduleForLater() {
    this.elements.scheduleForLaterButton().click();
    return this;
  }

  clickGoBackToEditor() {
    this.elements.goBackToEditorButton().click();
  }
}

class previewPostPage {
  elements = {
    preview: () =>
      cy.get('div.gh-post-preview-container.gh-post-preview-browser-container'),
  };

  getPreview() {
    return this.elements.preview;
  }
}

class EditorPostPage {
  constructor() {
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
    return this;
  }

  clickgoBackToPosts() {
    this.elements.goBackToPostsButton().click();

    const postsPage = new PostsPage();
    return postsPage;
  }

  publishPostRightNow() {
    this.elements.publishButton().click();
    this.publishModal
      .clickContinueFinalReview()
      .clickPublish()
      .clickGoBackToEditor();
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
    return this;
  }

  ClickUpdatePost() {
    this.elements.updateButton().click();
    return this;
  }

  clickPreviewPost() {
    this.elements.previewButton().click();
    const previewObj = new previewPostPage();
    return previewObj;
  }
}

export default EditorPostPage;
