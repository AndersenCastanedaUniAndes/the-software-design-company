// @ts-check
const { test, expect } = require("@playwright/test");
const { NavigationPageObject } = require("../../POM/NavigationPageObject");
const { AuthorizationPageObject } = require("../../POM/AuthorizationPageObject");
const { MemberPageObject } = require("../../POM/MemberPageObject");
const { generateRamdomMember, generateInvalidMemberEmail } = require("../../helpers/common");
require("dotenv").config();

const REFERENCE_VERSION = process.env.REFERENCE_VERSION;
const TEST_VERSION = process.env.TEST_VERSION;
const ACTIVE_VERSION = process.env.ACTIVE_VERSION;

test.describe("Como usuario administrador quiero poder registrar un nuevo miembro para poder enviarles novedades", () => {
  let navigation;
  let authorization;
  let members;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
      navigation = new NavigationPageObject(page);
      authorization = new AuthorizationPageObject(page);
      members = new MemberPageObject(page);

      const user = process.env.USERNAME;
      const password = process.env.PASSWORD;

      await navigation.goToRoot();

      await authorization.fillOutUsername(user);
      await navigation.screenshot("members");
      await authorization.fillOutPassword(password);
      await navigation.screenshot("members");
      await authorization.submit();
      await navigation.screenshot("members");
    });

    test.describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresar un nombre y un correo válido", () => {
          test.describe("And el miembro es creado sastifactoriamene", () => {
            test("Then debe verse en la lista de miembros", async ({ page }) => {
              await navigation.clickOnMembersViewLink();
              await navigation.screenshot("members");

              await navigation.clickOnNewMemberViewLink();
              await navigation.screenshot("members");

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // FILL OUT THE NEW MEMBER FORM
              await members.fillOutName(member);
              await navigation.screenshot("members");
              await members.fillOutEmail(member);
              await navigation.screenshot("members");
              await members.clickOnSaveButton();
              await navigation.screenshot("members");
              await navigation.clickOnMembersViewLink();
              await navigation.screenshot("members");

              //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
              const items = await members.getMembersTable();
              let wasCreated = false;
              for (let item of items) {
                const memberEmail = await item.innerText();
                if (memberEmail.includes(member.email)) {
                  wasCreated = true;
                }
              }
              expect(wasCreated).toBe(true);
            });
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero poder ser prevenido de registrar un nuevo miembro con datos inválidos (no ingresa un correo) para poder tener datos confiables.", () => {
  let navigation;
  let authorization;
  let members;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
    navigation = new NavigationPageObject(page);
    authorization = new AuthorizationPageObject(page);
    members = new MemberPageObject(page);

    const user = process.env.USERNAME;
    const password = process.env.PASSWORD;

    await navigation.goToRoot();

    await authorization.fillOutUsername(user);
    await navigation.screenshot("members");
    await authorization.fillOutPassword(password);
    await navigation.screenshot("members");
    await authorization.submit();
    await navigation.screenshot("members");
  });

    test.describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresa no ingresa un correo", () => {
          test.describe("And intenta crear un miembro", () => {
            test("Then entonces es alertado del error con un mensaje", async () => {
              await navigation.clickOnMembersViewLink();
              await navigation.screenshot("members");
              await navigation.clickOnNewMemberViewLink();
              await navigation.screenshot("members");

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // FILL OUT THE NEW MEMBER FORM
              const invalidMessage = "Please enter an email.";

              await members.clickOnSaveButton();
              await navigation.screenshot("members");

              // ASSERTION
              const error = await members.getEmailErrorMessage();
              expect(error).toBe(invalidMessage);
            });
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero poder ser prevenido de registrar un nuevo miembro con datos inválidos (correo ya existente) para poder tener datos confiables.", () => {
  let navigation;
  let authorization;
  let members;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
    navigation = new NavigationPageObject(page);
    authorization = new AuthorizationPageObject(page);
    members = new MemberPageObject(page);

    const user = process.env.USERNAME;
    const password = process.env.PASSWORD;

    await navigation.goToRoot();

    await authorization.fillOutUsername(user);
    await navigation.screenshot("members");
    await authorization.fillOutPassword(password);
    await navigation.screenshot("members");
    await authorization.submit();
    await navigation.screenshot("members");
  });

    test.describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresa un correo ya existente", () => {
          test.describe("And intenta crear un miembro", () => {
            test("Then entonces es alertado del error con un mensaje", async ({ page }) => {
              await navigation.clickOnMembersViewLink();
              await navigation.screenshot("members");
              await navigation.clickOnNewMemberViewLink();
              await navigation.screenshot("members");

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // FILL OUT THE NEW MEMBER FORM
              // FILL OUT THE NEW MEMBER FORM
              await members.fillOutName(member);
              await navigation.screenshot("members");
              await members.fillOutEmail(member);
              await navigation.screenshot("members");
              await members.clickOnSaveButton();
              await navigation.screenshot("members");

              // GOES TO THE NEW MEMBER PAGE
              await navigation.clickOnMembersViewLink();
              await navigation.screenshot("members");
              await navigation.clickOnNewMemberViewLink();
              await navigation.screenshot("members");

              // FILL OUT THE NEW MEMBER FORM - AGAIN
              await members.fillOutEmail(member);
              await navigation.screenshot("members");
              await members.clickOnSaveButton();
              await navigation.screenshot("members");

              // ASSERTION
              let error = "";
              if (ACTIVE_VERSION === REFERENCE_VERSION) {
                const invalidMessage = "Member already exists. Attempting to add member with existing email address";
                error = await members.getEmailErrorMessage();
                expect(error).toBe(invalidMessage);
              }
              else if (ACTIVE_VERSION === TEST_VERSION) {
                const invalidMessage = "Validation error, cannot save member. Member already exists. Attempting to add member with existing email address"
                error = await members.getEmailErrorMessageTestVersion();
                expect(error).toBe(invalidMessage);
              }
            });
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero poder ser prevenido de registrar un nuevo miembro con datos inválidos (nota con mas de 500 carácteres) para poder tener datos confiables.", () => {
  let navigation;
  let authorization;
  let members;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
    navigation = new NavigationPageObject(page);
    authorization = new AuthorizationPageObject(page);
    members = new MemberPageObject(page);

    const user = process.env.USERNAME;
    const password = process.env.PASSWORD;

    await navigation.goToRoot();

    await authorization.fillOutUsername(user);
    await navigation.screenshot("members");
    await authorization.fillOutPassword(password);
    await navigation.screenshot("members");
    await authorization.submit();
    await navigation.screenshot("members");
  });

    test.describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresa una nota con mas de 500 carácteres", () => {
          test.describe("And intenta crear un miembro", () => {
            test("Then entonces es alertado del error con un mensaje", async ({ page }) => {
              await navigation.clickOnMembersViewLink();
              await navigation.screenshot("members");
              await navigation.clickOnNewMemberViewLink();
              await navigation.screenshot("members");

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              const longNote = `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.`;
              const invalidMessage = "Note is too long.";

              // FILL OUT THE NEW MEMBER FORM
              await members.fillOutEmail(member);
              await navigation.screenshot("members");

              // FILLS OUT THE NOTE FIELD
              await members.fillOutNote(longNote);
              await navigation.screenshot("members");
              await members.onBlurNote(longNote);
              await navigation.screenshot("members");
              await members.clickOnSaveButton();
              await navigation.screenshot("members");

              // CLICKS ON THE SAVE BUTTON

              // ASSERTION
              const error = await members.getNoteErrorMessage();
              expect(error).toBe(invalidMessage);
            });
          });
        });
      });
    });
  });
});

test.describe("Como usuario administrador quiero poder ser prevenido de registrar un nuevo miembro con datos inválidos (correo inválido) para poder tener datos confiables.", () => {
  let navigation;
  let authorization;
  let members;

  test.describe("Given un usuario autenticado en la aplicación", () => {
    test.beforeEach(async ({ page }) => {
    navigation = new NavigationPageObject(page);
    authorization = new AuthorizationPageObject(page);
    members = new MemberPageObject(page);

    const user = process.env.USERNAME;
    const password = process.env.PASSWORD;

    await navigation.goToRoot();

    await authorization.fillOutUsername(user);
    await navigation.screenshot("members");
    await authorization.fillOutPassword(password);
    await navigation.screenshot("members");
    await authorization.submit();
    await navigation.screenshot("members");
  });

    test.describe("And navega hacia la seccion de miembros", () => {
      test.describe("And navega hacia la creación de un miembro", () => {
        test.describe("When ingresa un correo inválido", () => {
          test.describe("And intenta crear un miembro", () => {
            test("Then entonces es alertado del error con un mensaje", async () => {
              const invalidMessage = "Invalid Email.";

              await navigation.clickOnMembersViewLink();
              await navigation.screenshot("members");
              await navigation.clickOnNewMemberViewLink();
              await navigation.screenshot("members");

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // FILL OUT THE NEW MEMBER FORM
              const invalidEmail = generateInvalidMemberEmail(member.fullname);
              member.email = invalidEmail.email;

              // FILL OUT THE NEW MEMBER FORM
              await members.fillOutName(member);
              await navigation.screenshot("members");
              await members.fillOutEmail(member);
              await navigation.screenshot("members");
              await members.clickOnSaveButton();
              await navigation.screenshot("members");

              // ASSERTION
              const error = await members.getEmailErrorMessage();
              expect(error).toBe(invalidMessage);
            });
          });
        });
      });
    });
  });
});
