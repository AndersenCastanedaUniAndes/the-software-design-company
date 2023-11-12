const { faker } = require('@faker-js/faker');
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
        context('When I click in the new page button', () => {
          context('And I enter title "Mi nueva página" into field', () => {
            context('And el post es publicado', () => {
              context('Then cuando edito el titulo nuevamente', () => {
                it('And debe guardarse el post editado', () => {
                  // LOG IN
                  const loginObj = new LoginPage();
                  loginObj
                    .enterEmail(profile.email)
                    .enterPassword(profile.password);
                  const dashboardObj = loginObj.clickSignIn();

                  // POSTS
                  let postsObj = dashboardObj.goToPosts();

                  // Create a post and publish it
                  let editorPostObj = postsObj.clickNewPost();
                  const postTitle = faker.string.alpha(10);
                  postsObj = editorPostObj
                    .enterTitle(postTitle)
                    .publishPostRightNow()
                    .clickgoBackToPosts();

                  postsObj.findPostByName(postTitle).should('not.be.empty');

                  // Update a post and publish it
                  editorPostObj = postsObj.editPostedPostByName(postTitle);
                  const postTitleModified = faker.string.alpha(10);
                  postsObj = editorPostObj
                    .enterTitle(postTitleModified)
                    .ClickUpdatePost()
                    .clickgoBackToPosts();

                  postsObj
                    .findPostByName(postTitleModified)
                    .should('not.be.empty');
                });
              });
            });
          });
        });
      });
    });
  });
});