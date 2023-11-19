// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { PostPageObject } = require("../../POM/PostPageObject");
const { generateTitle } = require("../../helpers/common");

const REFERENCE_VERSION = process.env.REFERENCE_VERSION;
const TEST_VERSION = process.env.TEST_VERSION;
const ACTIVE_VERSION = process.env.ACTIVE_VERSION;

test.describe("Como usuario administrador quiero modificar un post ya publicado para después editar su contenido", () => {
  let navigation;
  let authorization;
  let posts;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      posts = new PostPageObject(page);

      await navigation.goToRoot();

      const user = process.env.USERNAME;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("posts");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("posts");
      await authorization.submit();
      await navigation.screenshot("posts");
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test.describe("And el post es publicado", () => {
            test.describe("And cuando edito el titulo nuevamente", () => {
              test("Then debe guardarse el post editado", async ({ page }) => {
                await navigation.clickOnPostsViewLink();
                await navigation.screenshot("posts");
                await posts.newPostButton();
                await navigation.screenshot("posts");
                const postTitle = generateTitle();
                await navigation.screenshot("posts");
                await posts.enterTitle(postTitle);
                await navigation.screenshot("posts");

                if (ACTIVE_VERSION === REFERENCE_VERSION) {
                  await posts.publishPostLater(postTitle);
                }
                if (ACTIVE_VERSION === TEST_VERSION) {
                  await posts.publishPostLaterTestVersion(postTitle);
                }

                await navigation.screenshot("posts");

                //IF THE POST IS LISTED
                let isListed = false;
                if (ACTIVE_VERSION === REFERENCE_VERSION) {
                  isListed = await posts.findPostByTitle(postTitle);
                }
                if (ACTIVE_VERSION === TEST_VERSION) {
                  isListed = await posts.findPostByTitleTestVersion(postTitle);
                }

                expect(isListed).toBe(true);
              });
            });
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero ver las analíticas de un post publicado para saber cómo se ha comportado", () => {
  let navigation;
  let authorization;
  let posts;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      posts = new PostPageObject(page);

      await navigation.goToRoot();
      const user = process.env.USERNAME;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("posts");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("posts");
      await authorization.submit();
      await navigation.screenshot("posts");
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test.describe("And el post es publicado", () => {
            test("Then no puedo ver las analiticas del mismo", async ({ page }) => {
              await navigation.clickOnPostsViewLink();
              await navigation.screenshot("posts");
              await posts.newPostButton();
              await navigation.screenshot("posts");
              const postTitle = generateTitle();
              await navigation.screenshot("posts");
              await posts.enterTitle(postTitle);
              await navigation.screenshot("posts");

              if (ACTIVE_VERSION === REFERENCE_VERSION) {
                await posts.publishPostRightNow(postTitle);
              }
              if (ACTIVE_VERSION === TEST_VERSION) {
                await posts.publishPostRightNowTestVersion(postTitle);
              }

              //IF THE POST IS LISTED
              let isListed = false;
              let isOpened = false;
              if (ACTIVE_VERSION === REFERENCE_VERSION) {
                isListed = await posts.findPostByTitle(postTitle);
                isOpened = await posts.openAnalyticsOfAPostByName(postTitle);
                expect(isOpened).toBe(true);
              }
              if (ACTIVE_VERSION === TEST_VERSION) {
                isListed = await posts.findPostByTitleTestVersion(postTitle);
                isOpened = await posts.openAnalyticsOfAPostByNameTestVersion(postTitle);
                expect(isOpened).toBe(false);
              }

              await navigation.screenshot("posts");
            });
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero previsualizar un post para saber cómo está quedando", () => {
  let navigation;
  let authorization;
  let posts;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      posts = new PostPageObject(page);

      await navigation.goToRoot();
      const user = process.env.USERNAME;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("posts");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("posts");
      await authorization.submit();
      await navigation.screenshot("posts");
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test("Then puedo previsualizar el post que estoy creando", async ({ page }) => {
            await navigation.clickOnPostsViewLink();
            await navigation.screenshot("posts");
            await posts.newPostButton();
            await navigation.screenshot("posts");
            const postTitle = generateTitle();
            await posts.enterTitle(postTitle);
            await navigation.screenshot("posts");

            let isPreviewPostButtonAvailable;
            if (ACTIVE_VERSION === REFERENCE_VERSION) {
              const isPreviewOpeneded = await posts.clickPreviewPost();
              expect(isPreviewOpeneded).toBe(true);
            }
            if (ACTIVE_VERSION === TEST_VERSION) {
              isPreviewPostButtonAvailable = await posts.isPreviewPostButtonAvailable();
              expect(isPreviewPostButtonAvailable).toBe(false);
            }
            await navigation.screenshot("posts");
          });
        });
      });
    });
  });
});

// Flanky Test
test.describe.skip("Como usuario administrador quiero agregar un draft post para después editar su contenido", () => {
  let navigation;
  let authorization;
  let posts;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      posts = new PostPageObject(page);

      await navigation.goToRoot();
      const user = process.env.USERNAME;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("posts");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("posts");
      await authorization.submit();
      await navigation.screenshot("posts");
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test.describe("And el post es guardado como draft", () => {
            test.describe("And cuando edito el titulo nuevamente", () => {
              test("Then debe guardarse el post editado", async ({ page }) => {
                await navigation.clickOnPostsViewLink();
                await navigation.screenshot("posts");
                await posts.newPostButton();
                await navigation.screenshot("posts");
                let postTitle = generateTitle();
                await navigation.screenshot("posts");
                await posts.enterTitle(postTitle);
                await navigation.screenshot("posts");
                await posts.goBackToPost(postTitle);
                await navigation.screenshot("posts");

                let isListed = false;
                if (ACTIVE_VERSION === REFERENCE_VERSION) {
                  isListed = await posts.findPostByTitle(postTitle);
                }
                if (ACTIVE_VERSION === TEST_VERSION) {
                  isListed = await posts.findPostByTitleTestVersion(postTitle);
                }
                expect(isListed).toBe(true);
                await posts.showPostByTitle(postTitle);
                await navigation.screenshot("posts");
                postTitle = generateTitle();
                await posts.enterTitle(postTitle);
                await navigation.screenshot("posts");
                await posts.goBackToPost(postTitle);
                await navigation.screenshot("posts");

                isListed = false;
                if (ACTIVE_VERSION === REFERENCE_VERSION) {
                  isListed = await posts.findPostByTitle(postTitle);
                }
                if (ACTIVE_VERSION === TEST_VERSION) {
                  isListed = await posts.findPostByTitleTestVersion(postTitle);
                }
                expect(isListed).toBe(true);
              });
            });
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero programar la publicación de un post para gestionar mejor el contenido", () => {
  let navigation;
  let authorization;
  let posts;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      posts = new PostPageObject(page);

      await navigation.goToRoot();

      const user = process.env.USERNAME;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("posts");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("posts");
      await authorization.submit();
      await navigation.screenshot("posts");
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test.describe("And el post es programado para ser publicado despues", () => {
            test("Then debe quedar el post programado satisfactoriamente", async ({ page }) => {
              await navigation.clickOnPostsViewLink();
              await navigation.screenshot("posts");
              await posts.newPostButton();
              await navigation.screenshot("posts");
              let postTitle = generateTitle();
              await posts.enterTitle(postTitle);
              await navigation.screenshot("posts");
              if (ACTIVE_VERSION === REFERENCE_VERSION) {
                await posts.publishPostLater(postTitle);
                const wasScheduled = await posts.wasPostScheduled(postTitle);
                expect(wasScheduled).toBe(true);
              }
              if (ACTIVE_VERSION === TEST_VERSION) {
                await posts.publishPostLaterTestVersion(postTitle);
              }
              await navigation.screenshot("posts");
            });
          });
        });
      });
    });
  });
});
