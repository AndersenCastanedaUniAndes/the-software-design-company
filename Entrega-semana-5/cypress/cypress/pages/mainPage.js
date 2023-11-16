class MainPage {
  mainContainer = () => cy.get('div.gh-viewport ');

  takeScreenshot() {
    this.mainContainer().screenshot();
    return this;
  }
}

export default MainPage
