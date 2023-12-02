// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { MemberPageObject } = require("../../POM/MemberPageObject");
const { generateRamdomMemberInMemory, generateValidRamdomMemberFromPool, generageRandomTextFromPool } = require("../../helpers/common");
const path = require("path");
const { describe } = require("node:test");
const { loadDataPool } = require("../../helpers/dataGenerator");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

describe("Como usuario administrator quiero poder buscar por nombre cualquier miembro activo usando los filtros", () => {
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
      await navigation.screenshot("members-deletion");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-deletion");
      await authorization.submit();
      await navigation.screenshot("members-deletion");
    });

    describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresar un nombre y un correo válido", () => {
          test.describe("And el miembro es creado sastifactoriamene", () => {
            test.describe("And navega nuevamente hacia la seccion de miembros", () => {
              test.describe("And selecciona abrir la ventana de filtros", () => {
                test.describe("When ingresar nombre de miembro creado", () => {
                  test("Then miembro debe aparecer en la lista", async ({ page }) => {
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-deletion");

                    await navigation.clickOnNewMemberViewLink();
                    await navigation.screenshot("members-deletion");

                    // GENERATES A NEW RAMDOM PERSON TO BE CREATED
                    const member = generateValidRamdomMemberFromPool(dataPool);

                    // FILL OUT THE NEW MEMBER FORM
                    await members.fillOutName(member);
                    await navigation.screenshot("members-deletion");
                    await members.fillOutEmail(member);
                    await navigation.screenshot("members-deletion");
                    await members.clickOnSaveButtonByDataTest();
                    await navigation.screenshot("members-deletion");
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-deletion");

                    //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
                    const isOnTheListFirstMember = await members.isMemberOnTheList(member);
                    await navigation.screenshot("members-deletion");

                    // ASSERTION - MEMBER IS LISTED
                    expect(isOnTheListFirstMember.found).toBe(true);

                    await page.locator(".view-actions-top-row div[data-test-button='members-filter-actions']").click();
                    await navigation.screenshot("members-deletion");
                    await page.waitForLoadState("domcontentloaded");
                    await page.waitForSelector(".gh-filters");

                    await page.locator("input[data-test-input='members-filter-value']").first().fill(member.fullname);
                    await navigation.screenshot("members-deletion--aaaaa");
                    await page.locator("button[data-test-button='members-apply-filter']").click();
                    await page.waitForSelector("table.gh-list");

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
      await navigation.screenshot("members-deletion");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-deletion");
      await authorization.submit();
      await navigation.screenshot("members-deletion");
    });

    describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresar un nombre y un correo válido", () => {
          test.describe("And el miembro es creado sastifactoriamene", () => {
            test.describe("And navega nuevamente hacia la seccion de miembros", () => {
              test.describe("And selecciona abrir la ventana de filtros", () => {
                test.describe("When ingresar datos ramdom", () => {
                  test("Then ser notificado de no encontrar coincidencias", async ({ page }) => {
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-deletion");

                    await navigation.clickOnNewMemberViewLink();
                    await navigation.screenshot("members-deletion");

                    // GENERATES A NEW RAMDOM PERSON TO BE CREATED
                    const member = generateValidRamdomMemberFromPool(dataPool);

                    // FILL OUT THE NEW MEMBER FORM
                    await members.fillOutName(member);
                    await navigation.screenshot("members-deletion");
                    await members.fillOutEmail(member);
                    await navigation.screenshot("members-deletion");
                    await members.clickOnSaveButtonByDataTest();
                    await navigation.screenshot("members-deletion");
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-deletion");

                    //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
                    const isOnTheListFirstMember = await members.isMemberOnTheList(member);
                    await navigation.screenshot("members-deletion");

                    // ASSERTION - MEMBER IS LISTED
                    expect(isOnTheListFirstMember.found).toBe(true);

                    await page.locator(".view-actions-top-row div[data-test-button='members-filter-actions']").click();
                    await navigation.screenshot("members-deletion");
                    await page.waitForLoadState("domcontentloaded");
                    await page.waitForSelector(".gh-filters");

                    //RAMDOM TEXT USING DATA FROM A POOL
                    const ramdomText = generageRandomTextFromPool(dataPool);

                    await page.locator("input[data-test-input='members-filter-value']").first().fill(ramdomText.text);
                    await navigation.screenshot("members-deletion--aaaaa");
                    await page.locator("button[data-test-button='members-apply-filter']").click();
                    await page.waitForSelector(".gh-members-empty");

                    // ASSERTION - NO MEMBERS FOUND MESSAGE
                    const isNoMembersMessageExists = (await page.getByText("No members match the current filter").count()) === 1;
                    expect(isNoMembersMessageExists).toBe(true);

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

  test.describe.only("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      const user = process.env.USERNAMEGHOST;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("members-deletion");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-deletion");
      await authorization.submit();
      await navigation.screenshot("members-deletion");
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
                    await navigation.screenshot("members-deletion");

                    await navigation.clickOnNewMemberViewLink();
                    await navigation.screenshot("members-deletion");

                    // GENERATES A NEW RAMDOM PERSON TO BE CREATED
                    const member = generateValidRamdomMemberFromPool(dataPool);

                    // FILL OUT THE NEW MEMBER FORM
                    await members.fillOutName(member);
                    await navigation.screenshot("members-deletion");
                    await members.fillOutEmail(member);
                    await navigation.screenshot("members-deletion");
                    await members.clickOnSaveButtonByDataTest();
                    await navigation.screenshot("members-deletion");
                    await navigation.clickOnMembersViewLink();
                    await navigation.screenshot("members-deletion");

                    //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
                    const isOnTheListFirstMember = await members.isMemberOnTheList(member);
                    await navigation.screenshot("members-deletion");

                    // ASSERTION - MEMBER IS LISTED
                    expect(isOnTheListFirstMember.found).toBe(true);

                    await page.locator(".view-actions-top-row div[data-test-button='members-filter-actions']").click();
                    await navigation.screenshot("members-deletion");
                    await page.waitForLoadState("domcontentloaded");
                    await page.waitForSelector(".gh-filters");

                    
                    await page.locator(".gh-filters select[data-test-select='members-filter']").first().selectOption("email");


                    /*await page.locator("input[data-test-input='members-filter-value']").first().fill(member.fullname);
                    await navigation.screenshot("members-deletion--aaaaa");
                    await page.locator("button[data-test-button='members-apply-filter']").click();
                    await page.waitForSelector("table.gh-list");

                    
                    const isOnTheListMember = await members.isMemberOnTheList(member);
                    expect(isOnTheListMember.found).toBe(true); */
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


