@5.69.0
Feature: Dejar de publicar una página existente

@user1 @web
Scenario: Como usuario administrador quiero dejar de publicar una página para no mostrar más su contenido
  Given I navigate to page "<BASEURL>"
  And I wait for 3 seconds
  And I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click sign in button with selector "button[type='submit']"
  And I wait for 2 seconds
  When I go to the pages section with selector "a[data-test-nav='pages']"
  And I wait for 2 seconds
  And I click in the new page button with selector "a[data-test-new-page-button]"
  And I wait for 2 seconds
  And I enter title "$name_title" into field with selector "textarea[data-test-editor-title-input]"
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
  And I click the page in order to edit it "$$name_title"
  And I wait for 2 seconds
  And I click in the unpublish button with selector "button[data-test-button='update-flow']"
  And I wait for 2 seconds
  And I click in unpublish and revert to draft button with selector "button[data-test-button='revert-to-draft']"
  And I wait for 2 seconds
  And I go back to the list of pages clicking the pages button with selector "a[data-test-link='pages']"
  And I wait for 2 seconds
  Then I visualize "$$name_title" as "Draft" in the list with selector "div.gh-posts-list-item-group"
  And I wait for 2 seconds