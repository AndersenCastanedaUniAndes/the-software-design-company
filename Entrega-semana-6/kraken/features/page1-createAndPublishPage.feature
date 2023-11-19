@4.48.9
Feature: Crear una página y publicarla

@user1 @web
Scenario: Como usuario administrador quiero crear una página nueva para después editar su contenido
  Given I navigate to page "<BASEURL>"
  And I wait for 3 seconds
  And I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click sign in button with selector "button[type='submit']"
  And I wait for 5 seconds
  And I try to remove the new version banner
  And I wait for 2 seconds
  When I go to the pages section
  And I wait for 2 seconds
  And I click in the new page button
  And I wait for 2 seconds
  And I enter title "$name_title" into field with selector "textarea.gh-editor-title"
  And I wait for 2 seconds
  And I click in the page publish button
  And I wait for 2 seconds
  And I click in the page continue, final review button
  And I wait for 2 seconds
  And I click in the publish page confirm button
  And I wait for 2 seconds
  And I go back to the editor section clicking the editor button with selector "button[data-test-button='close-publish-flow']"
  And I wait for 2 seconds
  And I go back to the list of pages clicking the pages button
  And I wait for 2 seconds
  Then I visualize the page "$$name_title" in the page list
  And I wait for 2 seconds
