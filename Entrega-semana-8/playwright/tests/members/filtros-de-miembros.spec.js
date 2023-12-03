// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { MemberPageObject } = require("../../POM/MemberPageObject");
const { generateValidRamdomMemberFromPool, generageRandomTextFromPool } = require("../../helpers/common");
const path = require("path");
const { describe } = require("node:test");
const { loadDataPool } = require("../../helpers/dataGenerator");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

describe("Como usuario administrator quiero poder buscar por nombre cualquier miembro activo usando un filtro", () => {
  let navigation;
  let authorization;
  let members;
  let dataPool;

  test.beforeAll(async () => {
    dataPool = await loadDataPool();
  });

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      const user = process.env.USERNAMEGHOST;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("members-filtering-by-name");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-filtering-by-name");
      await authorization.submit();
      await navigation.screenshot("members-filtering-by-name");
    });

    describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresar un nombre y un correo válido", () => {
          test.describe("And el miembro es creado sastifactoriamene", () => {
            test.describe("And navega nuevamente hacia la seccion de miembros", () => {
              test.describe("And selecciona abrir la ventana de filtros", () => {
                test.describe("When ingresar nombre de miembro creado", () => {
                  test("Then miembro debe aparecer en la lista", async ({ page }) => {
                    // GENERATES A NEW RAMDOM PERSON FROM A DATA POOL
                    const member = generateValidRamdomMemberFromPool(dataPool);

                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-filtering-by-name");

                    await navigation.clickOnNewMemberViewLink();
                    await navigation.screenshot("members-filtering-by-name");

                    // FILLS OUT THE NEW MEMBER FORM
                    await members.fillOutName(member);
                    await navigation.screenshot("members-filtering-by-name");
                    await members.fillOutEmail(member);
                    await navigation.screenshot("members-filtering-by-name");
                    await members.clickOnSaveButtonByDataTest();
                    await navigation.screenshot("members-filtering-by-name");
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-filtering-by-name");

                    //CHECKS IF THE MEMBER IS LISTED
                    const isOnTheListFirstMember = await members.isMemberOnTheList(member);
                    await navigation.screenshot("members-filtering-by-name");

                    // ASSERTION - MEMBER IS LISTED
                    expect(isOnTheListFirstMember.found).toBe(true);

                    // OPENS FILTER LIST
                    await members.openMembersFilterList();
                    await navigation.screenshot("members-filtering-by-name");

                    await members.filterByName(member);
                    await navigation.screenshot("members-filtering-by-name");
                    await members.applyMembersFilterList();
                    await members.waitForMembersList();

                    // ASSERTION - MEMBER IS LISTED
                    const isOnTheListMember = await members.isMemberOnTheList(member);
                    expect(isOnTheListMember.found).toBe(true);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

describe("Como usuario administrator quiero poder buscar por nombre cualquier miembro activo y ser avisando cuando no hay coincidencias", () => {
  let navigation;
  let authorization;
  let members;
  let dataPool;

  test.beforeAll(async () => {
    dataPool = await loadDataPool();
  });

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      const user = process.env.USERNAMEGHOST;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("members-filtering-no-results");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-filtering-no-results");
      await authorization.submit();
      await navigation.screenshot("members-filtering-no-results");
    });

    describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresar un nombre y un correo válido", () => {
          test.describe("And el miembro es creado sastifactoriamene", () => {
            test.describe("And navega nuevamente hacia la seccion de miembros", () => {
              test.describe("And selecciona abrir la ventana de filtros", () => {
                test.describe("When ingresar carácteres aleatorios en el camppo nombre", () => {
                  test("Then ser notificado de no encontrar coincidencias", async ({ page }) => {
                    const noMembersFoundMessage = "No members match the current filter";

                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-filtering-no-results");

                    await navigation.clickOnNewMemberViewLink();
                    await navigation.screenshot("members-filtering-no-results");

                    // GENERATES A NEW RAMDOM PERSON TO BE CREATED
                    const member = generateValidRamdomMemberFromPool(dataPool);

                    // FILL OUT THE NEW MEMBER FORM
                    await members.fillOutName(member);
                    await navigation.screenshot("members-filtering-no-results");
                    await members.fillOutEmail(member);
                    await navigation.screenshot("members-filtering-no-results");
                    await members.clickOnSaveButtonByDataTest();
                    await navigation.screenshot("members-filtering-no-results");
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-filtering-no-results");

                    //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
                    const isOnTheListFirstMember = await members.isMemberOnTheList(member);
                    await navigation.screenshot("members-filtering-no-results");

                    // ASSERTION - MEMBER IS LISTED
                    expect(isOnTheListFirstMember.found).toBe(true);

                    // OPENS FILTER LIST
                    await members.openMembersFilterList();
                    await navigation.screenshot("members-filtering-by-name");

                    // RAMDOM TEXT USING DATA FROM A POOL
                    const ramdomText = generageRandomTextFromPool(dataPool);
                    member.fullname = ramdomText.text;

                    await members.filterByName(member);
                    await navigation.screenshot("members-filtering-by-name");
                    await members.applyMembersFilterList();
                    await members.waitForCanvas();
                    await navigation.screenshot("members-filtering-by-name");

                    // ASSERTION - NO MEMBERS FOUND MESSAGE
                    const text = await page.locator("div.gh-members-empty h4").textContent();
                    expect(text).toBe(noMembersFoundMessage);

                    // ASSERTION - MEMBER IS NOT LISTED
                    const isOnTheListMember = await members.isMemberOnTheList(member);
                    expect(isOnTheListMember.found).toBe(false);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

describe("Como usuario administrator quiero poder buscar por email cualquier miembro activo usando los filtros", () => {
  let navigation;
  let authorization;
  let members;
  let dataPool;

  test.beforeAll(async () => {
    dataPool = await loadDataPool();
  });

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      const user = process.env.USERNAMEGHOST;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("members-filtering-by-email");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-filtering-by-email");
      await authorization.submit();
      await navigation.screenshot("members-filtering-by-email");
    });

    describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresar un nombre y un correo válido", () => {
          test.describe("And el miembro es creado sastifactoriamene", () => {
            test.describe("And navega nuevamente hacia la seccion de miembros", () => {
              test.describe("And selecciona abrir la ventana de filtros", () => {
                test.describe("When ingresar email de miembro creado", () => {
                  test("Then miembro debe aparecer en la lista", async ({ page }) => {
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-filtering-by-email");

                    await navigation.clickOnNewMemberViewLink();
                    await navigation.screenshot("members-filtering-by-email");

                    // GENERATES A NEW RAMDOM PERSON TO BE CREATED
                    const member = generateValidRamdomMemberFromPool(dataPool);

                    // FILL OUT THE NEW MEMBER FORM
                    await members.fillOutName(member);
                    await navigation.screenshot("members-filtering-by-email");
                    await members.fillOutEmail(member);
                    await navigation.screenshot("members-filtering-by-email");
                    await members.clickOnSaveButtonByDataTest();
                    await navigation.screenshot("members-filtering-by-email");
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-filtering-by-email");

                    //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
                    const isOnTheListFirstMember = await members.isMemberOnTheList(member);
                    await navigation.screenshot("members-filtering-by-email");

                    // ASSERTION - MEMBER IS LISTED
                    expect(isOnTheListFirstMember.found).toBe(true);

                    // OPENS FILTER LIST
                    await members.openMembersFilterList();
                    await navigation.screenshot("members-filtering-by-email");
                    await page.locator(".gh-filters select[data-test-select='members-filter']").first().selectOption("email");

                    await page.locator("input[data-test-input='members-filter-value']").first().fill(member.email);
                    await navigation.screenshot("members-filtering-by-email");
                    await members.applyMembersFilterList();
                    await members.waitForMembersList();

                    // ASSERTION - MEMBER IS FILTERED
                    const isOnTheListMember = await members.isMemberOnTheList(member);
                    expect(isOnTheListMember.found).toBe(true);
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

// Flaky test
describe.skip("Como usuario administrador quiero poder agregar mas filtros a la lista existente", () => {
  let navigation;
  let authorization;
  let members;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      const user = process.env.USERNAMEGHOST;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("members-filtering-add-filter");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-filtering-add-filter");
      await authorization.submit();
      await navigation.screenshot("members-filtering-add-filter");
    });

    describe("And navega hacia la seccion de miembros", () => {
      test.describe("And selecciona abrir la ventana de filtros", () => {
        test.describe("When agrega n filas de filtro", () => {
          test("Then deben aparecer n+1 filas en la lista de filtros", async ({ page }) => {
            await navigation.clickOnMembersViewLink();
            await navigation.screenshot("members-filtering-add-filter");

            // OPENS THE FILTER LIST
            await members.openMembersFilterList();
            await navigation.screenshot("members-filtering-add-filter");

            // CREATES MORE FILTER ITEMS
            await page.locator("button[data-test-button='add-members-filter']").click();
            await page.locator("button[data-test-button='add-members-filter']").click();
            await page.locator("button[data-test-button='add-members-filter']").click();
            await page.locator("button[data-test-button='add-members-filter']").click();

            // ASSERTION
            await expect(page.locator("div.gh-filter-block")).toHaveCount(5);
          });
        });
      });
    });
  });
});

// Flaky test
describe.skip("Como usuario administrador quiero poder eliminar filtros agregados a la lista existente", () => {
  let navigation;
  let authorization;
  let members;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      const user = process.env.USERNAMEGHOST;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("members-filtering-add-filter");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-filtering-add-filter");
      await authorization.submit();
      await navigation.screenshot("members-filtering-add-filter");
    });

    describe("And navega hacia la seccion de miembros", () => {
      test.describe("And selecciona abrir la ventana de filtros", () => {
        test.describe("When agrega n filas de filtro", () => {
          test.describe("And eliminar n filas de filtro", () => {
            test("Then deben aparecer la fila inicial en la lista de filtros", async ({ page }) => {
              await navigation.clickOnMembersViewLink();
              await navigation.screenshot("members-filtering-add-filter");

              // OPENS THE FILTER LIST
              await members.openMembersFilterList();
              await navigation.screenshot("members-filtering-add-filter");

            
              // CREATES MORE FILTER ITEMS
              await page.locator("button[data-test-button='add-members-filter']").click();
              await page.locator("button[data-test-button='add-members-filter']").click();
              await page.locator("button[data-test-button='add-members-filter']").click();
              await page.locator("button[data-test-button='add-members-filter']").click();

              // ASSERTION
              await expect(page.locator("div.gh-filter-block")).toHaveCount(5);

              await page.locator("button.gh-delete-filter>>nth=4").click();
              await expect(page.locator("div.gh-filter-block")).toHaveCount(4);

              await page.locator("button.gh-delete-filter>>nth=3").click();
              await expect(page.locator("div.gh-filter-block")).toHaveCount(3);

              await page.locator("button.gh-delete-filter>>nth=2").click();
              await expect(page.locator("div.gh-filter-block")).toHaveCount(2);

              await page.locator("button.gh-delete-filter>>nth=1").click();
              await expect(page.locator("div.gh-filter-block")).toHaveCount(1);
            });
          });
        });
      });
    });
  });
});
