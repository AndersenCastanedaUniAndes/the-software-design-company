@5.69.0
Feature: Crear internal tag con descripcion vaalida

@user1 @web
Scenario: Como usuario administrador quiero poder crear un internal tag con un texto valido en la descripción y validar que aparezca en la lista de los internal tags
  Given I navigate to page "<BASEURL>"
  And I wait for 5 seconds
  When I enter email "<USERNAME>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 5 seconds
  And I try to remove the new version banner
  And I wait for 2 seconds
  And I go to the tags section with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  And I go to internal tags section with selector "button[data-test-tags-nav='internal']"
  And I wait for 1 seconds
  And I click new tag button with selector "a.ember-view.gh-btn.gh-btn-primary"
  And I wait for 1 seconds
  And I enter internal title "$name_internalTag" into field with selector "input[id='tag-name']"
  And I wait for 1 seconds
  And I enter title "$name_description" into field with selector "textarea[id='tag-description']"
  And I wait for 1 seconds
  And I click in the save button
  And I wait for 1 seconds
  And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  Then I validate that the element "$$name_internalTag" is present in the list