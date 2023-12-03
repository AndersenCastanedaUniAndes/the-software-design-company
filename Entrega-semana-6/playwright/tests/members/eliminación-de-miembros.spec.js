// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { MemberPageObject } = require("../../POM/MemberPageObject");
const { generateRamdomMemberInMemory } = require("../../helpers/common");
const path = require("path");
const { describe } = require("node:test");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

describe("Como usuario administrator quiero poder eliminar cualquier miembro activo", () => {
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
              test.describe("And navega nuevamente hacia la seccion de miembros", () => {
                test.describe("When miembro registrado es seleccionado", () => {
                  test.describe("And navega hacia el detalle del miembro", () => {
                    test.describe("When elimina sastifactoriamente el miembro", () => {
                      test("Then ya no debe verse en la lista de miembros", async ({ page }) => {
                        await navigation.clickOnMembersViewLink();
                        await navigation.screenshot("members-deletion");

                        await navigation.clickOnNewMemberViewLink();
                        await navigation.screenshot("members-deletion");

                        // GENERATES A NEW RAMDOM PERSON TO BE CREATED
                        const member = generateRamdomMemberInMemory();

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

                        // DELETES A MEMBER
                        await isOnTheListFirstMember.item.click();
                        await page.locator("section.view-actions button[data-test-button='member-actions']").click();
                        await navigation.screenshot("members-deletion");
                        await page.locator("ul.gh-member-actions-menu button[data-test-button='delete-member']").click();
                        await page.waitForLoadState("domcontentloaded");
                        await navigation.screenshot("members-deletion");
                        await page.locator(".modal-footer button[data-test-button='confirm']").click();
                        await page.waitForLoadState("domcontentloaded");
                        await navigation.screenshot("members-deletion");
                        await page.waitForURL("**/members")
                        await page.reload();
                        await navigation.screenshot("members-deletion");
                        await page.waitForSelector("section.gh-canvas");
                        
                        // IF THERE ARE NO MEMBERS LEFT IN THE LIST
                        if (await page.locator("table.gh-list").count() === 0) {
                            const emptyContainer = await page.locator("div.gh-members-empty").count();
                            expect(emptyContainer).toBe(1);
                        }
                        // IF THERE ARE MEMBERS IN THE LIST
                        else {
                            await page.waitForSelector("table.gh-list");
                            const isOnTheListMember = await members.isMemberOnTheList(member);
                            // ASSERTION - MEMBER IS NOT LISTED
                            expect(isOnTheListMember.found).toBe(false);
                        }
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
  });
});
