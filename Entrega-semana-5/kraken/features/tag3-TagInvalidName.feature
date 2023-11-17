Feature: Crear tag con nombre invalido

@user1 @web
Scenario: Como usuario administrador quiero ingresar un nombre invalido para luego recibir un mensaje de error en pantalla
  Given I navigate to page "<BASEURL>"
  And I wait for 5 seconds
  When I enter email "<USERNAME>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 7 seconds
  And I go to the tags section with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  And I click new tag button with selector "a.ember-view.gh-btn.gh-btn-primary"
  And I wait for 1 seconds
  And I enter title " " into field with selector "input[id='tag-name']"
  And I wait for 1 seconds
  And I click in the save button
  And I wait for 1 seconds
  Then I must see an invalid name error "You must specify a name for the tag."
