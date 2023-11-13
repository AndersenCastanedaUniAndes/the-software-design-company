Feature: Crear una página y publicarla

@user1 @web
Scenario: Como usuario administrador quiero crear una página nueva para después editar su contenido
  Given I navigate to page "<BASEURL>"
  And I wait for 3 seconds
  And I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 5 seconds
  When I go to the pages section with selector "a[data-test-nav='pages']"
  And I wait for 2 seconds
  And I click in the new page button with selector "a[data-test-new-page-button]"
  And I wait for 2 seconds
  And I enter title "Mi nueva página" into field with selector "textarea[data-test-editor-title-input]"
  And I wait for 2 seconds
  And I click in the Publish button with selector "button[data-test-button='publish-flow']"
  And I wait for 2 seconds
  And I click in the Continue, final review button with selector "button[data-test-button='continue']"
  And I wait for 2 seconds
  And I click in the Publish page confirm button with selector "button[data-test-button='confirm-publish']"
  And I wait for 2 seconds
  And I go back to the editor section clicking the editor button with selector "button[data-test-button='close-publish-flow']"
  And I wait for 2 seconds
  And I go back to the list of pages clicking the pages button with selector "a[data-test-link='pages']"
  And I wait for 2 seconds
  Then I visualize "Mi nueva página" in the list with selector "div.gh-posts-list-item-group"
  And I wait for 2 seconds
