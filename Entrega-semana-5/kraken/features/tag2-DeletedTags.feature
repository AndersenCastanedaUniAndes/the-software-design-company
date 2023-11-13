Feature: Tag2 crear y editar tag

@user2 @web
Scenario: Como usuario administrador quiero modificar un post ya publicado para después eliminarlo
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  And I enter email "<USERNAME2>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD2>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 7 seconds
  When I go to the tags section with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  And I click new tag button with selector "a.ember-view.gh-btn.gh-btn-primary"
  And I wait for 1 seconds
  And I enter title "nuevo-tag" into field with selector "input[id='tag-name']"
  And I wait for 1 seconds
  And I click in the save button
  And I wait for 1 seconds
  And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  And I click the new tag in order to delete it "nuevo-tag-2"
  And I wait for 1 seconds
  And I click in the delete button with selector "button[data-test-button='delete-tag']"
  And I wait for 1 seconds
  And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
