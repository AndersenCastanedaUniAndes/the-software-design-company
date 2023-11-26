// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { MemberPageObject } = require("../../POM/MemberPageObject");
const { generateRamdomMemberInMemory, generateValidRamdomMemberFromPool } = require("../../helpers/common");
const path = require("path");
const { describe, before } = require("node:test");
const exp = require("constants");
const {loadDataPool} = require("../../helpers/dataGenerator");
const { da } = require("@faker-js/faker");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

describe("Como usuario administrator quiero poder actualizar los datos de cualquier miembro activo", () => {
  let navigation;
  let authorization;
  let members;
  let dataPool;
  
  test.beforeAll(async () => {
    // dataPool = await loadDataPool();
  })

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      const user = process.env.USERNAMEGHOST;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("members-update");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members-update");
      await authorization.submit();
      await navigation.screenshot("members-update");
    });

    describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresar un nombre y un correo válido", () => {
          test.describe("And el miembro es creado sastifactoriamene", () => {
            test.describe("And navega nuevamente hacia la seccion de miembros", () => {
              test.describe("And navega nuevamente hacia la seccion de miembros", () => {
                test.describe("When miembro registrado es seleccionado", () => {
                  test.describe("And navega hacia el detalle del miembro", () => {
                    test.describe("When ingresa un nombre y correo válidos diferentes", () => {
                      test.describe("And el miembro es actualizado sastifactoriamente", () => {
                        test("Then debe verse actualizado en la lista de miembros", async ({page}) => {
                          await navigation.clickOnMembersViewLink();
                          await navigation.screenshot("members-update");

                          await navigation.clickOnNewMemberViewLink();
                          await navigation.screenshot("members-update");

                          // GENERATES A NEW RAMDOM PERSON TO BE CREATED
                          const member = generateRamdomMemberInMemory();

                          // FILL OUT THE NEW MEMBER FORM
                          await members.fillOutName(member);
                          await navigation.screenshot("members-update");
                          await members.fillOutEmail(member);
                          await navigation.screenshot("members-update");
                          await members.clickOnSaveButtonByDataTest();
                          await navigation.screenshot("members-update");
                          await navigation.clickOnMembersViewLink();
                          await navigation.screenshot("members-update");

                          //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
                          const isOnTheListFirstMember = await members.isMemberOnTheList(member);
                          await isOnTheListFirstMember.item.click()
                          await navigation.screenshot("members-update");

                          // ASSERTION - MEMBER IS LISTED
                           expect(isOnTheListFirstMember.found).toBe(true);

                           // GENERATES A NEW RAMDOM PERSON TO UPDATE THE FIRST MEMBER
                          const updatedMember = generateRamdomMemberInMemory();

                          await members.fillOutEmail(updatedMember);
                          await navigation.screenshot("members-update");
                          await members.clickOnSaveButtonByDataTest();
                          await navigation.screenshot("members-update");
                         
                          await navigation.clickOnMembersViewLink();
                          await page.waitForSelector("table.gh-list")

                          //CHECKS IN THE TABLE IF THE UPDATED MEMBER IS LISTED
                          const isOnTheListUpdatedMember = await members.isMemberOnTheList(updatedMember);

                           // ASSERTION - UPDATED MEMBER IS LISTED
                           expect(isOnTheListUpdatedMember.found).toBe(true);
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
});
