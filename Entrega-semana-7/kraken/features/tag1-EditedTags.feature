@5.69.0
Feature: Crear y editar tag

@user1 @web
Scenario: Como usuario administrador quiero poder crear un nuevo Tag para después editar su contenido
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
  And I enter title "$name_tag" into field with selector "input[id='tag-name']"
  And I wait for 1 seconds
  And I click in the save button
  And I wait for 1 seconds
  And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  And I click the new tag in order to edit it "$$name_tag"
  And I wait for 1 seconds
  And I enter title "$name-tagModified" into field with selector "input[id='tag-name']"
  And I wait for 1 seconds
  And I click in the save button
  Then I must see an success name advise "Saved"
