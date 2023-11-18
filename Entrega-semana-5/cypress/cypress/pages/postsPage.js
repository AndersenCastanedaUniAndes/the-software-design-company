import NavigationSection from './section/navSection';
import EditorPostPage from './editorPostPage';
import PostAnalyticsPage from './postAnalyticsPage';

class PostsPage {
  constructor() {
    this.navigationBar = new NavigationSection();
  }

  elements = {
    newPostButton: () => cy.get('a[data-test-new-post-button]'),
    postList: () => cy.get('li[data-test-post-id]'),
  };

  clickNewPost() {
    this.elements.newPostButton().click();

    const editorPostPage = new EditorPostPage();
    return editorPostPage;
  }

  findPostByName(name) {
    return this.elements.postList().contains(name);
  }

  wasPostScheduled(name) {
    return this.findPostByName(name).contains('Scheduled');
  }

  editPostedPostByName(name) {
    this.findPostByName(name).click();

    const editorPostPage = new EditorPostPage();
    return editorPostPage;
  }

  openAnalyticsOfAPostByName(name) {
    this.findPostByName(name).next().next().next().click();
    const analytics = new PostAnalyticsPage();
    return analytics;
  }
}

export default PostsPage;
