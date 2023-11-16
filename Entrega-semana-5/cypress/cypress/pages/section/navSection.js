import PagesPage from '../pagesPage';
import PostsPage from '../postsPage';
import MainPage from '../mainPage';

class NavigationSection extends MainPage {
  elements = {
    pagesAnchor: () => cy.get('a[data-test-nav="pages"]'),
    postsAnchor: () => cy.get('a[data-test-nav="posts"]'),
  };

  clickPages() {
    this.elements.pagesAnchor().click();
    
    this.takeScreenshot()
    const pages = new PagesPage();
    return pages;
  }

  clickPosts() {
    this.elements.postsAnchor().click();

    this.takeScreenshot()
    const posts = new PostsPage();
    return posts;
  }
}

export default NavigationSection;