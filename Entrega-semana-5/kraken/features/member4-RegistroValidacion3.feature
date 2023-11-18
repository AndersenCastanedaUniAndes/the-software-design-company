Feature: member4-registro-validacion-nota-con-mas-de-500-caracteres

@user1 @web
Scenario: Como usuario administrador quiero poder ser prevenido de crear miembros con datos inválidos (nota con mas de 500 carácteres) para poder tener datos confiables.
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
    And I wait for 2 seconds
    And I enter a valid email "$email_member" into a field with selector "member-email"
    And I wait for 2 seconds
    And I enter a note with more than 500 characters into a field with selector "member-note"
    And I wait for 2 seconds
    And I try to save the member by pressing the save button ".view-actions button"
    And I wait for 2 seconds
    Then I must see a too many characters note error with selector "div.gh-member-note.error p"
