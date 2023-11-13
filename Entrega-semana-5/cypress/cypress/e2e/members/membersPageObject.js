class Logger {
  hookExceptionsLogger() {
    cy.on("uncaught:exception", (err) => {
      console.log(`ERROR: ${err}`);
      return false;
    });
  }
}

class MembersPage {
  getMembersTable(email){
    return cy.get("table.gh-list tbody.ember-view  tr a p.gh-members-list-email");
  }

  clickOnSaveButton(){
     cy.get(".view-actions button").click();
     return this;
  }

  fillOutName(member){
    cy.get("input#member-name").type(member.fullname);
    return this;
  }

  fillOutNote(note){
    cy.get("textarea#member-note").type(note);
    return this;
  }

  onBlurNote(){
    cy.get("textarea#member-note").blur();
    return this;
  }

  fillOutEmail(member){
    cy.get("input#member-email").type(member.email)
    return this;
  }
  
}

class Navigation {
  goToPageRoot() {
    cy.visit("/");
  }

  goToMemberListPage(){
    cy.get('.relative a[href="#/members/"]').click();
    return this;
  }

  goToNewMemberPage(){
    cy.get('a[href="#/members/new/"]').click()
    return this;
  }
}

class UserAuthorization {
  navigation = new Navigation();

  fillOutUsername(email){
     cy.get("input#identification").type(email)
     return this;
  }

  fillOutPassword(password){
      cy.get("input#password").type(password)
      return this;
  }

  submit() {
    cy.get("form.gh-signin button[data-test-button='sign-in']").click();
    return this;
  }
}

module.exports = {
  Logger,
  Navigation,
  UserAuthorization,
  MembersPage
};
