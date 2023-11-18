import NavigationSection from '../pages/section/navSection';

class DashboardPage {
  constructor() {
    this.navigationBar = new NavigationSection();
  }

  goToPages() {
    return this.navigationBar.clickPages();
  }

  goToPosts() {
    return this.navigationBar.clickPosts();
  }
}

export default DashboardPage;