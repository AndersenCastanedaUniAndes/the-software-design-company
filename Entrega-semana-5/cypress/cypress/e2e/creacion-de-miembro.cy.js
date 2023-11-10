const { faker } = require('@faker-js/faker');

const generateRamdomMember = () => {
    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const name = faker.person.firstName().toLocaleLowerCase();
    return {
        fullname: name,
        email: `${name}-${id}@test.com`
    }
}

describe("Como usuario administrador quiero poder registrar un nuevo miembro para poder enviarles novedades", () => {
    let users = [];
    beforeEach(() => {
        cy.visit("/")
        cy.on('uncaught:exception', (err) => {
            console.log(`ERROR: ${err}`)
                return false;
        })
    })
    context('Given un usuario autenticado en la aplicación', () => {
        context('And navega hacia la seccion de miembros', () => {
            context('And navega hacia la creación de un miembro', () => {
                context("When ingresar un nombre y un correo válido", () => {
                    context("And el miembro es creado sastifactoriamene", () => {
                        it("Then debe verse en la lista de miembros", async () => {
                                users = await cy.fixture('users');

                                // LOGIN
                                cy.get("input#identification").type(users[0].email)
                                cy.get("input#password").type(users[0].password)
                                cy.get("form.gh-signin button[data-test-button='sign-in']").click()

                                //GENERATE RAMDOM PERSON
                                const member = generateRamdomMember();

                                cy.get('.relative a[href="#/members/"]').click()
                                cy.get('a[href="#/members/new/"]').click()

                                //FILL OUT THE MEMBER'S FORM
                                cy.get("input#member-name").type(member.fullname)
                                cy.get("input#member-email").type(member.email)
                                cy.wait(3000)
                                cy.get(".view-actions button").click()
                                cy.wait(3000)
                                cy.get('.relative a[href="#/members/"]').click()

                                //CHECKS IN THE TABLE IF THE MEMBER IS LISTED
                                cy.get("table.gh-list tbody.ember-view  tr a p.gh-members-list-email")
                                  .invoke("text")
                                  .should("contains", member.email)            
                        })
                    })
                })
            })
        })
    })
})