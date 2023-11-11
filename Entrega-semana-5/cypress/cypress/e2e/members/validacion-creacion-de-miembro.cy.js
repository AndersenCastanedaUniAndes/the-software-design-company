const { faker } = require("@faker-js/faker");
const { Navigation, UserAuthorization, Logger, MembersPage } = require("./membersPageObject");

const generateRamdomMember = () => {
  const uuid = () => Cypress._.random(0, 1e6);
  const id = uuid();
  const name = faker.person.firstName().toLocaleLowerCase();
  return {
    fullname: name,
    email: `${name}-${id}@test.com`,
  };
};

const generateInvalidMemberEmail = (name) => {
  const uuid = () => Cypress._.random(0, 1e6);
  const id = uuid();
  return {
    email: `${name}-${id}@test.`,
  };
};

describe("Como usuario administrador quiero poder ser prevenido de crear miembros con datos inválidos para poder tener datos confiables.", () => {
  let users = [];
  let authorization;
  let navigation;
  let logger;
  let membersPage;
  before(async () => {
    users = await cy.fixture("users");
    authorization = new UserAuthorization();
    navigation = new Navigation();
    logger = new Logger();
    membersPage = new MembersPage();
  });
  beforeEach(() => {
    logger.hookExceptionsLogger();
    navigation.goToPageRoot();
  });
  context("Given un usuario autenticado en la aplicación", () => {
    context("And navega hacia la seccion de miembros", () => {
      context("And navega hacia la creación de un miembro", () => {
        context("When ingresa un correo inválido", () => {
          context("And intenta crear un miembro", () => {
            it("Then entonces es alertado del error con un mensaje", async () => {
              const invalidMessage = "Invalid Email.";
              // LOGIN
              authorization.fillOutUsername(users[0].email).fillOutPassword(users[0].password).submit();

              //GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // GOES TO THE NEW MEMBER PAGE
              navigation.goToMemberListPage().goToNewMemberPage();

              // FILL OUT THE NEW MEMBER FORM
              const invalidEmail = generateInvalidMemberEmail(member.fullname);
              member.email = invalidEmail.email;
              membersPage.fillOutName(member).fillOutEmail(member).clickOnSaveButton();
              cy.wait(2000);

              // ASSERTION
              cy.get("div.gh-cp-member-email-name .form-group.max-width.error p").contains(invalidMessage);
            });
          });
        });
        context("When ingresa no ingresa un correo", () => {
          context("And intenta crear un miembro", () => {
            it("Then entonces es alertado del error con un mensaje", async () => {
              // LOGIN
              authorization.fillOutUsername(users[0].email).fillOutPassword(users[0].password).submit();

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // GOES TO THE NEW MEMBER PAGE
              navigation.goToMemberListPage().goToNewMemberPage();

              // FILL OUT THE NEW MEMBER FORM
              const invalidMessage = "Please enter an email.";
              const invalidEmail = generateInvalidMemberEmail(member.fullname);
              member.email = invalidEmail.email;
              membersPage.fillOutEmail(member).clickOnSaveButton();
              cy.wait(2000);

              // ASSERTION
              cy.get("div.gh-cp-member-email-name .form-group.max-width.error p").contains(invalidMessage);
            });
          });
        });
        context("When ingresa un correo ya existente", () => {
          context("And intenta crear un miembro", () => {
            it("Then entonces es alertado del error con un mensaje", async () => {
              // LOGIN
              authorization.fillOutUsername(users[0].email).fillOutPassword(users[0].password).submit();

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // GOES TO THE NEW MEMBER PAGE
              navigation.goToMemberListPage().goToNewMemberPage();

              const invalidMessage = "Member already exists. Attempting to add member with existing email address";

              // FILL OUT THE NEW MEMBER FORM
              membersPage.fillOutName(member).fillOutEmail(member).clickOnSaveButton();
              cy.wait(2000);

              // GOES TO THE NEW MEMBER PAGE
              navigation.goToMemberListPage().goToNewMemberPage();

              // FILL OUT THE NEW MEMBER FORM - AGAIN
              membersPage.fillOutEmail(member).clickOnSaveButton();
              cy.wait(2000);

              // ASSERTION
              cy.get("div.gh-cp-member-email-name .form-group.max-width.error p").contains(invalidMessage);
            });
          });
        });
        context("When ingresa una nota con mas de 500 carácteres", () => {
          context("And intenta crear un miembro", () => {
            it("Then entonces es alertado del error con un mensaje", async () => {
              // LOGIN
              authorization.fillOutUsername(users[0].email).fillOutPassword(users[0].password).submit();

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // GOES TO THE NEW MEMBER PAGE
              navigation.goToMemberListPage().goToNewMemberPage();
              const longNote = `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.`;
              const invalidMessage = "Note is too long.";

              // FILL OUT THE NEW MEMBER FORM
              membersPage.fillOutEmail(member);

              // FILLS OUT THE NOTE FIELD
              membersPage.fillOutNote(longNote).onBlurNote();
              cy.wait(2000);

              // CLICKS ON THE SAVE BUTTON
              membersPage.clickOnSaveButton();

              // ASSERTION
              cy.get("div.gh-member-note.error p").contains(invalidMessage);
            });
          });
        });
      });
    });
  });
});
