@5.69.0
Feature: Crear y eliminar tag

@user1 @web
Scenario: Como usuario administrador quiero poder crear un nuevo Tag para después eliminarlo
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
  And I click new tag button with selector "a.ember-view.gh-btn.gh-btn-primary"
  And I wait for 1 seconds
  And I enter title "$name_tag" into field with selector "input[id='tag-name']"
  And I wait for 1 seconds
  And I click in the save button
  And I wait for 1 seconds
  And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  And I click the new tag in order to delete it "$$name_tag"
  And I wait for 1 seconds
  And I click in the delete tag button with selector "button[data-test-button='delete-tag']"
  And I wait for 1 seconds
  And I click in the confirm delete button with selector "button[data-test-button='confirm']"
  And I wait for 1 seconds
  And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  Then I validate that the element "$$name_tag" is not present in the list