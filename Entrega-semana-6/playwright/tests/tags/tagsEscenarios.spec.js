// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { TagsPageObject } = require("../../POM/TagsPageObject");

test.describe("Como usuario administrador quiero poder crear un nuevo Tag para después editar su contenido", () => {
    let navigation;
    let authorization;
    let tags;
  
    test.describe("Given un usuario autenticado en la aplicación", () => {
      test.beforeEach(async ({ page }) => {
        navigation = new NavigationPageObject(page);
        authorization = new AuthorizationPageObject(page);
        tags = new TagsPageObject(page);
  
        await navigation.goToRoot();
        await authorization.fillOutUsername("a.menesess@uniandes.edu.co");
        await navigation.screenshot();
        await authorization.fillOutPassword("*93ZPspkZVHtS.d");
        await navigation.screenshot();
        await authorization.submit();
        await navigation.screenshot();
      });
  
      test.describe("when navega hacia la seccion de tags", () => {
        test.describe("And doy click en el boton new tag", () => {
          test.describe("And agrego un nombre al tag", () => {
            test.describe("And el tag es guardado", () => {
              test.describe("And cuando edito el nombre nuevamente", () => {
                test("Then debe guardarse el tag editado", async ({ page }) => {
                  await navigation.clickOnTagsViewLink();
                  await navigation.screenshot();
                  await tags.newTagButton();
                  await navigation.screenshot();
                  const tagName = "tag-nuevo";
                  
                  await tags.enterName(tagName);
                  await navigation.screenshot();
                  await tags.saveTagButton();
                  await page.waitForTimeout(2000);
                  await navigation.screenshot();
                  await tags.goBackToTags();
                  await navigation.screenshot();
                  await tags.selectCreatedTag(tagName);
                  await navigation.screenshot();
                  
                  const modifiedName = "tag-modificado";
                  await tags.enterName(modifiedName);
                  await navigation.screenshot();
                  await tags.saveTagButton();
                  await page.waitForTimeout(2000);
                  await navigation.screenshot();

                  //IF THE TAG IS SAVED
                  const isSaved = await tags.successSavedButton();
                  expect(isSaved).toEqual("Saved");
                });
              });
            });
          });
        });
      });
    });
  });
  

test.describe("Como usuario administrador quiero poder crear un nuevo Tag para después eliminarlo", () => {
    let navigation;
    let authorization;
    let tags;
  
    test.describe("Given un usuario autenticado en la aplicación", () => {
      test.beforeEach(async ({ page }) => {
        navigation = new NavigationPageObject(page);
        authorization = new AuthorizationPageObject(page);
        tags = new TagsPageObject(page);
  
        await navigation.goToRoot();
        await authorization.fillOutUsername("a.menesess@uniandes.edu.co");
        await navigation.screenshot();
        await authorization.fillOutPassword("*93ZPspkZVHtS.d");
        await navigation.screenshot();
        await authorization.submit();
        await navigation.screenshot();
      });
  
      test.describe("when navega hacia la seccion de tags", () => {
        test.describe("And doy click en el boton new tag", () => {
          test.describe("And agrego un nombre al tag", () => {
            test.describe("And el tag es guardado", () => {
              test.describe("And cuando elimino el tag guardado", () => {
                test("Then debe validar que no aparezca en la lista", async ({ page }) => {
                  await navigation.clickOnTagsViewLink();
                  await navigation.screenshot();
                  await tags.newTagButton();
                  await navigation.screenshot();
                  const tagName = "tag-nuevo2";
                  
                  await tags.enterName(tagName);
                  await navigation.screenshot();
                  await tags.saveTagButton();
                  await page.waitForTimeout(2000);
                  await navigation.screenshot();
                  await tags.goBackToTags();
                  await navigation.screenshot();
                  await tags.selectCreatedTag(tagName);
                  await navigation.screenshot();               
                  await tags.deleteTagButton();
                  await navigation.screenshot();

                  //IF THE TAG IS DELETED
                  const isDeleted = await tags.findDeletedTagByName(tagName);
                  expect(isDeleted).toBe(true);
                });
              });
            });
          });
        });
      });
    });
  });


test.describe("Como usuario administrador quiero poder crear un nuevo Tag con el campo de nombre vacío para que se muestre un aviso de advertencia por el campo vacío", () => {
    let navigation;
    let authorization;
    let tags;
  
    test.describe("Given un usuario autenticado en la aplicación", () => {
      test.beforeEach(async ({ page }) => {
        navigation = new NavigationPageObject(page);
        authorization = new AuthorizationPageObject(page);
        tags = new TagsPageObject(page);
  
        await navigation.goToRoot();
        await authorization.fillOutUsername("a.menesess@uniandes.edu.co");
        await navigation.screenshot();
        await authorization.fillOutPassword("*93ZPspkZVHtS.d");
        await navigation.screenshot();
        await authorization.submit();
        await navigation.screenshot();
      });
  
      test.describe("when navega hacia la seccion de tags", () => {
        test.describe("And doy click en el boton new tag", () => {
          test.describe("And agrego un nombre vacio al tag", () => {
            test.describe("And cuando el tag es guardado", () => {
                test("Then debe ver advertencia de nombre vacio", async ({ page }) => {
                  await navigation.clickOnTagsViewLink();
                  await navigation.screenshot();
                  await tags.newTagButton();
                  await navigation.screenshot();
                  const tagName = " ";
                  
                  await tags.enterName(tagName);
                  await navigation.screenshot();
                  await tags.saveTagButton();
                  await page.waitForTimeout(1500);
                  await navigation.screenshot();

                  //IF THE TAG NAME IS EMPTY
                  const errorMessage = await tags.invalidTagNameError();
                  expect(errorMessage).toEqual("You must specify a name for the tag.");
                });
            });
          });
        });
      });
    });
  });


test.describe("Como usuario administrador quiero poder crear un nuevo Tag en la opción “internal tags” para después editarlo", () => {
    let navigation;
    let authorization;
    let tags;
  
    test.describe("Given un usuario autenticado en la aplicación", () => {
      test.beforeEach(async ({ page }) => {
        navigation = new NavigationPageObject(page);
        authorization = new AuthorizationPageObject(page);
        tags = new TagsPageObject(page);
  
        await navigation.goToRoot();
        await authorization.fillOutUsername("a.menesess@uniandes.edu.co");
        await navigation.screenshot();
        await authorization.fillOutPassword("*93ZPspkZVHtS.d");
        await navigation.screenshot();
        await authorization.submit();
        await navigation.screenshot();
      });
  
      test.describe("when navega hacia la seccion de tags", () => {
        test.describe("And doy click en el boton internal tag", () => {
            test.describe("And doy click en el boton new tag", () => {
                test.describe("And agrego un nombre al tag", () => {
                    test.describe("And el tag es guardado", () => {
                        test.describe("And cuando edito el nombre nuevamente", () => {
                            test("Then debe guardarse el tag editado", async ({ page }) => {
                                await navigation.clickOnTagsViewLink();
                                await navigation.screenshot();
                                await navigation.clickOnInternalTagViewLink();
                                await navigation.screenshot();
                                await tags.newTagButton();
                                await navigation.screenshot();
                                const tagName = "#internal-tag-nuevo";
                                
                                await tags.enterName(tagName);
                                await navigation.screenshot();
                                await tags.saveTagButton();
                                await page.waitForTimeout(1500);
                                await navigation.screenshot();
                                await tags.goBackToTags();
                                await navigation.screenshot();
                                await tags.selectCreatedInternalTag("internal-tag-nuevo");
                                await navigation.screenshot();
                                
                                const modifiedName = "#internal-tag-modificado";
                                await tags.enterName(modifiedName);
                                await navigation.screenshot();
                                await tags.saveTagButton();
                                await page.waitForTimeout(1500);
                                await navigation.screenshot();

                                //IF THE TAG IS SAVED
                                const isSaved = await tags.successSavedButton();
                                expect(isSaved).toEqual("Saved");
                            });
                        });
                    });
                });
            });
        });
      });
    });
  });

  
test.describe("Como usuario administrador quiero poder crear un nuevo Tag en la opción “internal tags” para después eliminarlo", () => {
    let navigation;
    let authorization;
    let tags;
  
    test.describe("Given un usuario autenticado en la aplicación", () => {
      test.beforeEach(async ({ page }) => {
        navigation = new NavigationPageObject(page);
        authorization = new AuthorizationPageObject(page);
        tags = new TagsPageObject(page);
  
        await navigation.goToRoot();
        await authorization.fillOutUsername("a.menesess@uniandes.edu.co");
        await navigation.screenshot();
        await authorization.fillOutPassword("*93ZPspkZVHtS.d");
        await navigation.screenshot();
        await authorization.submit();
        await navigation.screenshot();
      });
  
      test.describe("when navega hacia la seccion de tags", () => {
        test.describe("And doy click en el boton internal tag", () => {
            test.describe("And doy click en el boton new tag", () => {   
                test.describe("And agrego un nombre al tag", () => {
                    test.describe("And el tag es guardado", () => {
                        test.describe("And cuando elimino el tag guardado", () => {
                            test("Then debe validar que no aparezca en la lista", async ({ page }) => {
                                await navigation.clickOnTagsViewLink();
                                await navigation.screenshot();
                                await navigation.clickOnInternalTagViewLink();
                                await navigation.screenshot();
                                await tags.newTagButton();
                                await navigation.screenshot();
                                const tagName = "#internal-tag-nuevo2";
                                
                                await tags.enterName(tagName);
                                await navigation.screenshot();
                                await tags.saveTagButton();
                                await page.waitForTimeout(1500);
                                await navigation.screenshot();
                                await tags.goBackToTags();
                                await navigation.screenshot();
                                await tags.selectCreatedInternalTag("internal-tag-nuevo2");
                                await navigation.screenshot();               
                                await tags.deleteTagButton();
                                await navigation.screenshot();

                                //IF THE TAG IS DELETED
                                const isDeleted = await tags.findDeletedTagByName(tagName);
                                expect(isDeleted).toBe(true);
                            });
                        });
                    });
                });
            });
        });
      });
    });
  });