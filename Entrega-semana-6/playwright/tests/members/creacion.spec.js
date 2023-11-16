// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { MemberPageObject } = require("../../POM/MemberPageObject");
const { generateRamdomMember } = require("../../helpers/common");

test.describe("Como usuario administrador quiero poder registrar un nuevo miembro para poder enviarles novedades", () => {
  let navigation;
  let authorization;
  let members;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      await navigation.goToRoot();

      await authorization.fillOutUsername("juan.de.jesus.mirelles@gmail.com");
      await authorization.fillOutPassword("0123456789");
      await authorization.submit();
    });

    test.describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresar un nombre y un correo válido", () => {
          test.describe("And el miembro es creado sastifactoriamene", () => {
            test("Then debe verse en la lista de miembros", async ({ page }) => {
              await navigation.clickOnMembersViewLink();

              await navigation.clickOnNewMemberViewLink();

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // FILL OUT THE NEW MEMBER FORM
              await members.fillOutName(member);
              await members.fillOutEmail(member);
              await members.clickOnSaveButton();

              await navigation.clickOnMembersViewLink();

              //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
              const items = await members.getMembersTable();
              let wasCreated = false;
              items.forEach(async (item) => {
                const memberEmail = await item.innerText();
                if (memberEmail === member.email) wasCreated = true;
              });

              await page.screenshot({ path: "screenshot999.png" });
              expect(wasCreated).toBe(true);
            });
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero poder ser prevenido de registrar un nuevo miembro con datos inválidos para poder tener datos confiables.", () => {});
