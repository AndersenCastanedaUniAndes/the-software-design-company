import NavigationSection from '../pages/section/navSection';

class DashboardPage {
  constructor() {
    this.navigationBar = new NavigationSection();
  }

  goToPosts() {
    return this.navigationBar.clickPosts();
  }
}

export default DashboardPage;
