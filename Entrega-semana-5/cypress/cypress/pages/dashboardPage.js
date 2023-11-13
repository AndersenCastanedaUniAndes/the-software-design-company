import NavigationSection from '../pages/section/navSection';

class DashboardPage {
  constructor() {
    this.navigationBar = new NavigationSection();
  }

  goToPages() {
    return this.navigationBar.clickPages();
  }
}

export default DashboardPage;