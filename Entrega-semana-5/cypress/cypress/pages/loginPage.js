import DashboardPage from './dashboardPage';

class LoginPage {
  elements = {
    emailInput: () => cy.get('input[name="identification"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginBtn: () => cy.get('button[data-test-button="sign-in"]'),
  };

  enterEmail(username) {
    this.elements.emailInput().should('be.visible').clear();
    this.elements.emailInput().should('be.visible').type(username);
    return this;
  }

  enterPassword(password) {
    this.elements.passwordInput().should('be.visible').clear();
    this.elements.passwordInput().should('be.visible').type(password);
    return this;
  }

  clickSignIn() {
    this.elements.loginBtn().click();

    const dashboardPage = new DashboardPage();
    return dashboardPage;
  }
}

export default LoginPage;
