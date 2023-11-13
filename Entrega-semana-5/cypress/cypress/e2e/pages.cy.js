import { should } from 'chai';
import LoginPage from '../pages/loginPage';

describe('Feature Pages', () => {
  let profile = {};
  beforeEach(async function () {
    profile = await cy.fixture('profile');

    cy.on('uncaught:exception', (err) => {
      console.log(`ERROR: ${err}`);
      return false;
    });
    cy.visit('/');
  });

  describe('Como usuario administrador quiero crear una página nueva para después editar su contenido', () => {
    context('Given an authenticated user in the app', () => {
      context('And navigate to pages section', () => {
        context('And I click in the new page button', () => {
          context('And I enter title "Mi nueva página" into field', () => {
            context('When I publish the page and confirm the publish', () => {
              context('Then I navigate to the page in the list of pages', () => {
                it('should list the new page in the list of pages', () => {

                  // Login
                  const loginPage = new LoginPage();

                  loginPage
                    .enterEmail(profile.email)
                    .enterPassword(profile.password);

                  const dashboardPage = loginPage.clickSignIn();

                  // Navigates to Pages
                  let pagesPage = dashboardPage.goToPages();

                  // Create and publish a new page
                  pagesPage.clickNewPage();
                  pagesPage.addPageTitle('Mi nueva página');
                  pagesPage
                    .publishPage()
                    .continuePublish()
                    .confirmPublish();

                  // Navigates to Pages
                  pagesPage
                    .closePublishEditor()
                    .goBackToPagesList();

                  // Validates that the created page exist
                  var newPageInList = pagesPage.visualizeNewPageInList();
                  should().equal(newPageInList, true);
                });
              });
            });
          });
        });
      });
    });
  });
});