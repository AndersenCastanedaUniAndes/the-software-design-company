Feature: member1-registro-exito

@user1 @web
Scenario: Como usuario administrador quiero poder registrar un nuevo miembro para poder enviarles novedades
  Given I navigate to page "http://localhost:2369/ghost/#/signin"
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
  And I enter a valid email "$email_member" into a field with selector "member-email"
  And I wait for 2 seconds
  And I try to save the member by pressing the save button ".view-actions button"
  And I wait for 2 seconds
  When I go to the members section with selector "a[href='#/members/']"
  And I wait for 2 seconds
  Then I must see the member listed in the members list section "table.gh-list tbody.ember-view  tr a p.gh-members-list-email"
