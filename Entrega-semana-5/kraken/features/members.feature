Feature: members

@user1 @web
Scenario: Como usuario administrador quiero poder registrar un nuevo miembro para poder enviarles novedades
  Given I navigate to page "http://localhost:2369/ghost/#/signin"
  And I wait for 5 seconds
  And I enter email "<USERNAME2>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD2>"
  And I wait for 2 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 4 seconds
  When I go to the members section with selector "a[href='#/members/']"
  And I wait for 2 seconds
  And I click in the new member button with selector "a[href='#/members/new/']"
  And I wait for 2 seconds
  And I enter a name "$name_member" into a field with selector "member-name"
  And I enter a valid email "$email_member" into a field with selector "member-email"
  And I wait for 2 seconds
  And I try to save the member by pressing the save button ".view-actions button"
  And I wait for 2 seconds
  When I go to the members section with selector "a[href='#/members/']"
  And I wait for 2 seconds
  Then I must see the member listed in the members list section "table.gh-list tbody.ember-view  tr a p.gh-members-list-email"

@user2 @web
  Scenario: Como usuario administrador quiero poder ser prevenido de crear miembros con datos inválidos (correo invalido) para poder tener datos confiables.
    Given I navigate to page "http://localhost:2369/ghost/#/signin"
    And I wait for 5 seconds
    And I enter email "<USERNAME2>"
    And I wait for 2 seconds
    And I enter password "<PASSWORD2>"
    And I wait for 2 seconds
    And I click sign in button with selector "button[data-test-button='sign-in']"
    And I wait for 4 seconds
    When I go to the members section with selector "a[href='#/members/']"
    And I wait for 2 seconds
    And I click in the new member button with selector "a[href='#/members/new/']"
    And I wait for 2 seconds
    And I enter a name "$name_member" into a field with selector "member-name"
    And I enter a invalid email "$email_member" into a field with selector "member-email"
    And I wait for 2 seconds
    And I try to save the member by pressing the save button ".view-actions button"
    And I wait for 2 seconds
    Then I must see an invalid email error "div.gh-cp-member-email-name .form-group.max-width.error p"

@user3 @web
  Scenario: Como usuario administrador quiero poder ser prevenido de crear miembros con datos inválidos (correo vacio) para poder tener datos confiables.
    Given I navigate to page "http://localhost:2369/ghost/#/signin"
    And I wait for 5 seconds
    And I enter email "<USERNAME2>"
    And I wait for 2 seconds
    And I enter password "<PASSWORD2>"
    And I wait for 2 seconds
    And I click sign in button with selector "button[data-test-button='sign-in']"
    And I wait for 4 seconds
    When I go to the members section with selector "a[href='#/members/']"
    And I wait for 2 seconds
    And I click in the new member button with selector "a[href='#/members/new/']"
    And I wait for 2 seconds
    And I enter a name "$name_member" into a field with selector "member-name"
    And I wait for 2 seconds
    And I do not enter a valid email into a field with selector "member-email"
    And I wait for 2 seconds
    And I try to save the member by pressing the save button ".view-actions button"
    And I wait for 2 seconds
    Then I must see an empty email error with selector "div.gh-cp-member-email-name .form-group.max-width.error p"

@user4 @web
Scenario: Como usuario administrador quiero poder ser prevenido de crear miembros con datos inválidos (nota con mas de 500 carácteres) para poder tener datos confiables.
    Given I navigate to page "http://localhost:2369/ghost/#/signin"
    And I wait for 5 seconds
    And I enter email "<USERNAME2>"
    And I wait for 2 seconds
    And I enter password "<PASSWORD2>"
    And I wait for 2 seconds
    And I click sign in button with selector "button[data-test-button='sign-in']"
    And I wait for 4 seconds
    When I go to the members section with selector "a[href='#/members/']"
    And I wait for 2 seconds
    And I click in the new member button with selector "a[href='#/members/new/']"
    And I wait for 2 seconds
    And I enter a name "$name_member" into a field with selector "member-name"
    And I wait for 2 seconds
    And I enter a valid email "$email_member" into a field with selector "member-email"
    And I wait for 2 seconds
    And I enter a note with more than 500 characters into a field with selector "member-note"
    And I wait for 2 seconds
    And I try to save the member by pressing the save button ".view-actions button"
    And I wait for 2 seconds
    Then I must see a too many characters note error with selector "div.gh-member-note.error p"

@user5 @web
Scenario: Como usuario administrador quiero poder ser prevenido de crear miembros con datos inválidos (correo ya existente) para poder tener datos confiables.
    Given I navigate to page "http://localhost:2369/ghost/#/signin"
    And I wait for 5 seconds
    And I enter email "<USERNAME2>"
    And I wait for 2 seconds
    And I enter password "<PASSWORD2>"
    And I wait for 2 seconds
    And I click sign in button with selector "button[data-test-button='sign-in']"
    And I wait for 4 seconds
    When I go to the members section with selector "a[href='#/members/']"
    And I wait for 2 seconds
    And I click in the new member button with selector "a[href='#/members/new/']"
    And I wait for 2 seconds
    And I enter a name "$name_member" into a field with selector "member-name"
    And I wait for 2 seconds
    And I enter a ramdom email "$email_member" into a field with selector "member-email"
    And I wait for 2 seconds
    And I try to save the member by pressing the save button ".view-actions button"
    And I wait for 7 seconds
    When I go to the members section with selector "a[href='#/members/']"
    And I wait for 2 seconds
    And I click in the new member button with selector "a[href='#/members/new/']"
    And I wait for 5 seconds
    And I enter an existing valid email into a field with selector "member-email"
    And I try to save the member by pressing the save button ".view-actions button"
    And I wait for 2 seconds
    Then I must see an already exists member error with selector "div.gh-cp-member-email-name .form-group.max-width.error p"
    And I wait for 2 seconds