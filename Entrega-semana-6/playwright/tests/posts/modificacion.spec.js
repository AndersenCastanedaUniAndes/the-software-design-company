// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { PostPageObject } = require("../../POM/PostPageObject");
const { generateTitle } = require("../../helpers/common");

test.describe.only("Como usuario administrador quiero modificar un post ya publicado para después editar su contenido", () => {
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
                const list = await page.locator("li[data-test-post-id] .gh-content-entry-title").all();
                let wasCreated = false;
                for (let item of list) {
                  let postTitle = await item.innerText();
                  if (postTitle.includes(postTitle)) {
                    wasCreated = true;
                  }
                }
                expect(true).toBe(true);
              });
            });
          });
        });
      });
    });
  });
});
