class PostAnalyticsPage {
  elements = {
    title: () => cy.get('h2.gh-canvas-title.gh-post-title'),
  };

  getTitle() {
    return this.elements.title;
  }
}

export default PostAnalyticsPage;
