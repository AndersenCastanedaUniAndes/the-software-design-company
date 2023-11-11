Feature: Posts

@user1 @web
Scenario: Como usuario administrador quiero agregar un draft post para después editar su contenido
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  And I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 7 seconds
  When I go to the posts section with selector "a[data-test-nav='posts']"
  And I wait for 2 seconds
  And I click in the new post button with selector "a[data-test-new-post-button]"
  And I enter title "$name_postTitle" into field with selector "textarea[data-test-editor-title-input]"

@user2 @web
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
  And I try to save the member by pressing the save button ".view-actions button"
  And I wait for 2 seconds
  When I go to the members section with selector "a[href='#/members/']"
  And I wait for 2 seconds
  Then I must see the member listed in the members list section "table.gh-list tbody.ember-view  tr a p.gh-members-list-email"