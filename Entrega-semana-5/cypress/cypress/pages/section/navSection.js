import PagesPage from '../pagesPage';
import PostsPage from '../postsPage';

class NavigationSection {
  elements = {
    pagesAnchor: () => cy.get('a[data-test-nav="pages"]'),
    postsAnchor: () => cy.get('a[data-test-nav="posts"]'),
  };

  clickPages() {
    this.elements.pagesAnchor().click();
    
    const pages = new PagesPage();
    return pages;
  }

  clickPosts() {
    this.elements.postsAnchor().click();

    const posts = new PostsPage();
    return posts;
  }
}

export default NavigationSection;