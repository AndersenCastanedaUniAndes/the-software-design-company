const { faker } = require('@faker-js/faker');
import LoginPage from '../pages/loginPage';

describe('Feature Posts', () => {
  let profile = {};
  beforeEach(async function () {
    profile = await cy.fixture('profile');

    cy.on('uncaught:exception', (err) => {
      console.log(`ERROR: ${err}`);
      return false;
    });
    cy.visit('/');
  });

  describe('Como usuario administrador quiero modificar un post ya publicado para después editar su contenido', () => {
    context('Given un usuario autenticado en la aplicación', () => {
      context('And navega hacia la seccion de posts', () => {
        context('When doy click en el buton new post', () => {
          context('And agrego un titulo al post', () => {
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

  describe('Como usuario administrador quiero ver las analíticas de un post publicado para saber cómo se ha comportado', () => {
    context('Given un usuario autenticado en la aplicación', () => {
      context('And navega hacia la seccion de posts', () => {
        context('When doy click en el buton new post', () => {
          context('And agrego un titulo al post', () => {
            context('And el post es publicado', () => {
              it('Then puedo ver las analiticas del mismo', () => {
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

                // Open analytics of a post
                let analyticsPostObj =
                  postsObj.openAnalyticsOfAPostByName(postTitle);

                expect(analyticsPostObj.getTitle()).to.exist;
              });
            });
          });
        });
      });
    });
  });

  describe('Como usuario administrador quiero previsualizar un post para saber cómo está quedando', () => {
    context('Given un usuario autenticado en la aplicación', () => {
      context('And navega hacia la seccion de posts', () => {
        context('When doy click en el buton new post', () => {
          context('And agrego un titulo al post', () => {
            it('Then puedo previsualizar el post que estoy creando', () => {
              // LOG IN
              const loginObj = new LoginPage();
              loginObj
                .enterEmail(profile.email)
                .enterPassword(profile.password);
              const dashboardObj = loginObj.clickSignIn();

              // POSTS
              let postsObj = dashboardObj.goToPosts();

              // Create a post and previzualise it
              let editorPostObj = postsObj.clickNewPost();
              const postTitle = faker.string.alpha(10);
              const previewPostsObj = editorPostObj
                .enterTitle(postTitle)
                .clickPreviewPost();

              expect(previewPostsObj.getPreview()).to.exist;
            });
          });
        });
      });
    });
  });

  describe('Como usuario administrador quiero agregar un draft post para después editar su contenido', () => {
    context('Given un usuario autenticado en la aplicación', () => {
      context('And navega hacia la seccion de posts', () => {
        context('When doy click en el buton new post', () => {
          context('And agrego un titulo al post', () => {
            context('And el post es guardado como draft', () => {
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
                    .clickgoBackToPosts();

                  postsObj.findPostByName(postTitle).should('not.be.empty');

                  // Update a post and publish it
                  editorPostObj = postsObj.editPostedPostByName(postTitle);
                  const postTitleModified = faker.string.alpha(10);
                  postsObj = editorPostObj
                    .enterTitle(postTitleModified)
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

  describe('Como usuario administrador quiero programar la publicación de un post para gestionar mejor el contenido', () => {
    context('Given un usuario autenticado en la aplicación', () => {
      context('And navega hacia la seccion de posts', () => {
        context('When doy click en el buton new post', () => {
          context('And agrego un titulo al post', () => {
            context(
              'And el post es programado para ser publicado despues',
              () => {
                it('Then debe quedar el post programado satisfactoriamente', () => {
                  // LOG IN
                  const loginObj = new LoginPage();
                  loginObj
                    .enterEmail(profile.email)
                    .enterPassword(profile.password);
                  const dashboardObj = loginObj.clickSignIn();

                  // POSTS
                  let postsObj = dashboardObj.goToPosts();

                  // Create a post and publish it later
                  let editorPostObj = postsObj.clickNewPost();
                  const postTitle = faker.string.alpha(10);
                  postsObj = editorPostObj
                    .enterTitle(postTitle)
                    .publishPostLater()
                    .clickgoBackToPosts();

                  postsObj.wasPostScheduled(postTitle).should('not.be.empty');
                });
              }
            );
          });
        });
      });
    });
  });
});
