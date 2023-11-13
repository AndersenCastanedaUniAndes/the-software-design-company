import PostsPage from '../postsPage';
class NavigationSection {
  elements = {
    postsAnchor: () => cy.get('a[data-test-nav="posts"]'),
  };

  clickPosts() {
    this.elements.postsAnchor().click();

    const posts = new PostsPage();
    return posts;
  }
}

export default NavigationSection;
