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

describe("Como usuario administrador quiero poder registrar un nuevo miembro para poder enviarles novedades", () => {
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
        context("When ingresar un nombre y un correo válido", () => {
          context("And el miembro es creado sastifactoriamene", () => {
            it("Then debe verse en la lista de miembros", async () => {
              // LOGIN
              authorization.fillOutUsername(users[0].email).fillOutPassword(users[0].password).submit();

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // GOES TO THE NEW MEMBER PAGE
              navigation.goToMemberListPage().goToNewMemberPage();

              // FILL OUT THE NEW MEMBER FORM
              membersPage.fillOutName(member)
                         .fillOutEmail(member)
                         .clickOnSaveButton();
              cy.wait(2000);

              navigation.goToMemberListPage();

              //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
              membersPage.getMembersTable().invoke("text").should("contains", member.email);
            });
          });
        });
      });
    });
  });
});
