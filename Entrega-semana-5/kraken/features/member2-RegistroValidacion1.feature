@5.69.0
Feature: member2-registro-validacion-correo-invalido

@user1 @web
Scenario: Como usuario administrador quiero poder ser prevenido de crear miembros con datos inválidos (correo invalido) para poder tener datos confiables.
    Given I navigate to page "<BASEURL>"
    And I wait for 5 seconds
    And I enter email "<USERNAME>"
    And I wait for 2 seconds
    And I enter password "<PASSWORD>"
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
