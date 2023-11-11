const { faker } = require("@faker-js/faker");

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
  before(async () => {
    users = await cy.fixture("users");
  })
  beforeEach(() => {
    cy.on("uncaught:exception", (err) => {
      console.log(`ERROR: ${err}`);
      return false;
    });
    cy.visit("/");
  });
  context("Given un usuario autenticado en la aplicación", () => {
    context("And navega hacia la seccion de miembros", () => {
      context("And navega hacia la creación de un miembro", () => {
        context("When ingresa un correo inválido", () => {
          context("And intenta crear un miembro", () => {
            it("Then entonces es alertado del error con un mensaje", async () => {
              // LOGIN
              cy.get("input#identification").type(users[0].email);
              cy.get("input#password").type(users[0].password);
              cy.get("form.gh-signin button[data-test-button='sign-in']").click();

              //GENERATE RAMDOM PERSON
              const member = generateRamdomMember();

              cy.get('.relative a[href="#/members/"]').click();
              cy.get('a[href="#/members/new/"]').click();

              //FILL OUT THE MEMBER'S EMAIL WITH AN INVALID EMAIL FORMAT
              const invalidMessage = "Invalid Email.";
              const invalidEmail = generateInvalidMemberEmail(member.fullname);
              cy.get("input#member-name").type(member.fullname);
              cy.get("input#member-email").type(invalidEmail.email);
              cy.wait(3000);
              cy.get(".view-actions button").click();
              cy.wait(3000);

              cy.get("div.gh-cp-member-email-name .form-group.max-width.error p").contains(invalidMessage);
            });
          });
        });
        context("When ingresa no ingresa un correo", () => {
          context("And intenta crear un miembro", () => {
            it("Then entonces es alertado del error con un mensaje", async () => {
              // LOGIN
              cy.get("input#identification").type(users[0].email);
              cy.get("input#password").type(users[0].password);
              cy.get("form.gh-signin button[data-test-button='sign-in']").click();

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // NAVIGATES TO THE MEMBER LIST SECIONT AND THEN TO THE NEW MEMBER FORM
              cy.get('.relative a[href="#/members/"]').click();
              cy.get('a[href="#/members/new/"]').click();

              // FILLS OUT THE EMAIL FIELD
              const invalidMessage = "Please enter an email.";
              const invalidEmail = generateInvalidMemberEmail(member.fullname);
              cy.get("input#member-email").type(invalidEmail.email);
              cy.wait(3000);

              // CLICKS ON THE SAVE BUTTON
              cy.get(".view-actions button").click();
              cy.wait(3000);

              cy.get("div.gh-cp-member-email-name .form-group.max-width.error p").contains(invalidMessage);
            });
          });
        });
        context("When ingresa un correo ya existente", () => {
          context("And intenta crear un miembro", () => {
            it("Then entonces es alertado del error con un mensaje", async () => {
              // LOGIN
              cy.get("input#identification").type(users[0].email);
              cy.get("input#password").type(users[0].password);
              cy.get("form.gh-signin button[data-test-button='sign-in']").click();

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // NAVIGATES TO THE MEMBER LIST SECIONT AND THEN TO THE NEW MEMBER FORM
              cy.get('.relative a[href="#/members/"]').click();
              cy.get('a[href="#/members/new/"]').click();

              const invalidMessage = "Member already exists. Attempting to add member with existing email address";

              // FILLS OUT THE EMAIL FIELD
              cy.get("input#member-email").type(member.email);
              cy.wait(3000);

              // CLICKS ON THE SAVE BUTTON
              cy.get(".view-actions button").click();
              cy.wait(3000);
              
              // NAVIGATES TO THE MEMBER LIST SECIONT AND THEN TO THE NEW MEMBER FORM
              cy.get('.relative a[href="#/members/"]').click();
              cy.get('a[href="#/members/new/"]').click();

              cy.get("input#member-email").type(member.email);
              cy.wait(3000);

               // CLICKS ON THE SAVE BUTTON
              cy.get(".view-actions button").click();

              // ASSERTION
              cy.get("div.gh-cp-member-email-name .form-group.max-width.error p").contains(invalidMessage);
            });
          });
        });
        context("When ingresa una nota con mas de 500 carácteres", () => {
          context("And intenta crear un miembro", () => {
            it("Then entonces es alertado del error con un mensaje", async () => {
              // LOGIN
              cy.get("input#identification").type(users[0].email);
              cy.get("input#password").type(users[0].password);
              cy.get("form.gh-signin button[data-test-button='sign-in']").click();

              // GENERATES A RAMDOM PERSON
              const member = generateRamdomMember();

              // NAVIGATES TO THE MEMBER LIST SECIONT AND THEN TO THE NEW MEMBER FORM
              cy.get('.relative a[href="#/members/"]').click();
              cy.get('a[href="#/members/new/"]').click();

              const longNote = `Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.`;
              const invalidMessage = "Note is too long.";

              // FILLS OUT THE EMAIL FIELD
              cy.get("input#member-email").type(member.email);

              // FILLS OUT THE NOTE FIELD
              cy.get("textarea#member-note").type(longNote);
              cy.get("textarea#member-note").blur()
              cy.wait(3000);

              // CLICKS ON THE SAVE BUTTON
              cy.get(".view-actions button").click();
              cy.wait(3000);
              
              // ASSERTION
              cy.get("div.gh-member-note.error p").contains(invalidMessage);
            });
          });
        });
      });
    });
  });
});
