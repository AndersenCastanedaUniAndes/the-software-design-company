Feature: Posts

@user1 @web
Scenario: Como usuario administrador quiero modificar un post ya publicado para después editar su contenido
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  And I enter email "<USERNAME2>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD2>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 7 seconds
  When I go to the posts section with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  