Feature: Dejar de publicar una página existente

@user1 @web
Scenario: Como usuario administrador quiero dejar de publicar una página para no mostrar más su contenido
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
  And I click in the edit page button with selector "span.gh-post-list-cta.edit"
  And I wait for 2 seconds
  And I click in the unpublish button with selector "button[data-test-button='update-flow']"
  And I wait for 2 seconds
  And I click in unpublish and revert to draft button with selector "button[data-test-button='revert-to-draft']"
  And I wait for 2 seconds
  And I go back to the list of pages clicking the pages button with selector "a[data-test-link='pages']"
  And I wait for 2 seconds
  Then I visualize "Mi nueva página" as "Draft" in the list with selector "div.gh-posts-list-item-group"
  And I wait for 2 seconds
