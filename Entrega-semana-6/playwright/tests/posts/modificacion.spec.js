// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { PostPageObject } = require("../../POM/PostPageObject");
const { generateTitle } = require("../../helpers/common");

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

      await authorization.fillOutUsername("juan.de.jesus.mirelles@gmail.com");
      await navigation.screenshot();
      await authorization.fillOutPassword("0123456789");
      await navigation.screenshot();
      await authorization.submit();
      await navigation.screenshot();
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test.describe("And el post es publicado", () => {
            test.describe("And cuando edito el titulo nuevamente", () => {
              test("Then debe guardarse el post editado", async ({ page }) => {
                await navigation.clickOnPostsViewLink();
                await posts.newPostButton();
                const postTitle = generateTitle();

                await posts.enterTitle(postTitle);
                await posts.publishPostLater(postTitle);
                await navigation.screenshot();

                //IF THE POST IS LISTED
                const isListed = await posts.findPostByTitle(postTitle);
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

      await authorization.fillOutUsername("juan.de.jesus.mirelles@gmail.com");
      await navigation.screenshot();
      await authorization.fillOutPassword("0123456789");
      await navigation.screenshot();
      await authorization.submit();
      await navigation.screenshot();
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test.describe("And el post es publicado", () => {
            test("Then puedo ver las analiticas del mismo", async ({ page }) => {
              await navigation.clickOnPostsViewLink();
              await posts.newPostButton();
              const postTitle = generateTitle();
              await posts.enterTitle(postTitle);
              await posts.publishPostRightNow(postTitle);
              const isListed = await posts.findPostByTitle(postTitle);
              expect(isListed).toBe(true);
              const isOpened = await posts.openAnalyticsOfAPostByName(postTitle);
              expect(isOpened).toBe(true);
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

      await authorization.fillOutUsername("juan.de.jesus.mirelles@gmail.com");
      await navigation.screenshot();
      await authorization.fillOutPassword("0123456789");
      await navigation.screenshot();
      await authorization.submit();
      await navigation.screenshot();
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test("Then puedo previsualizar el post que estoy creando", async ({ page }) => {
            await navigation.clickOnPostsViewLink();
            await posts.newPostButton();
            const postTitle = generateTitle();
            await posts.enterTitle(postTitle);
            const isPreviewOpeneded = await posts.clickPreviewPost();
            expect(isPreviewOpeneded).toBe(true);
            await navigation.screenshot();
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero agregar un draft post para después editar su contenido", () => {
  let navigation;
  let authorization;
  let posts;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      posts = new PostPageObject(page);

      await navigation.goToRoot();

      await authorization.fillOutUsername("juan.de.jesus.mirelles@gmail.com");
      await navigation.screenshot();
      await authorization.fillOutPassword("0123456789");
      await navigation.screenshot();
      await authorization.submit();
      await navigation.screenshot();
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test.describe("And el post es guardado como draft", () => {
            test.describe("And cuando edito el titulo nuevamente", () => {
              test("Then debe guardarse el post editado", async ({ page }) => {
                await navigation.clickOnPostsViewLink();
                await posts.newPostButton();
                let postTitle = generateTitle();
                await posts.enterTitle(postTitle);
                await posts.goBackToPost(postTitle);
                //IF THE POST IS LISTED
                let isListed = await posts.findPostByTitle(postTitle);
                expect(isListed).toBe(true);
                await posts.showPostByTitle(postTitle);
                postTitle = generateTitle();
                await posts.enterTitle(postTitle);
                await posts.goBackToPost(postTitle);
                isListed = await posts.findPostByTitle(postTitle);
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

      await authorization.fillOutUsername("juan.de.jesus.mirelles@gmail.com");
      await navigation.screenshot();
      await authorization.fillOutPassword("0123456789");
      await navigation.screenshot();
      await authorization.submit();
      await navigation.screenshot();
    });

    test.describe("And navega hacia la seccion de posts", () => {
      test.describe("When doy click en el buton new post", () => {
        test.describe("And agrego un titulo al post", () => {
          test.describe("And el post es programado para ser publicado despues", () => {
            test("Then debe quedar el post programado satisfactoriamente", async ({ page }) => {
              await navigation.clickOnPostsViewLink();
              await posts.newPostButton();
              let postTitle = generateTitle();
              await posts.enterTitle(postTitle);
              await posts.publishPostLater(postTitle);
              await navigation.screenshot();
              const wasScheduled = await posts.wasPostScheduled(postTitle);
              expect(wasScheduled).toBe(true);
            });
          });
        });
      });
    });
  });
});
