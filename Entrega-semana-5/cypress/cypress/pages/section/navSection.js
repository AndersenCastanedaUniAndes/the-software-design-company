import PagesPage from '../pagesPage';

class NavigationSection {
  elements = {
    pagesAnchor: () => cy.get('a[data-test-nav="pages"]'),
  };

  clickPages() {
    this.elements.pagesAnchor().click();

    const pages = new PagesPage();
    return pages;
  }
}

export default NavigationSection;