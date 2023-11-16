import DashboardPage from './dashboardPage';
import MainPage from './mainPage';

class LoginPage extends MainPage {
  elements = {
    emailInput: () => cy.get('input[name="identification"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('button[data-test-button="sign-in"]'),
  };

  enterEmail(username) {
    this.elements.emailInput().should('be.visible').clear();
    this.elements.emailInput().should('be.visible').type(username);
    this.takeScreenshot();
    return this;
  }

  enterPassword(password) {
    this.elements.passwordInput().should('be.visible').clear();
    this.elements.passwordInput().should('be.visible').type(password);
    this.takeScreenshot();
    return this;
  }

  clickSignIn() {
    this.elements.loginBtn().click();

    const dashboardPage = new DashboardPage();
    this.takeScreenshot();
    return dashboardPage;
  }
}

export default LoginPage;
