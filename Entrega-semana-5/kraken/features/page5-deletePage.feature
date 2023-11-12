Feature: Ver el preview de una página existente

@user1 @web
Scenario: Como usuario administrador quiero eliminar una página para no tenerla más en mi lista de páginas
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
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
  And I click in the settings button with selector "button[title='Settings']"
  And I wait for 2 seconds
  And I click in the delete button with selector "#entry-controls > div > div.settings-menu-content > div > button"
  And I wait for 2 seconds
  And I click in the delete confirm button with selector "button.gh-btn.gh-btn-red"
  And I wait for 2 seconds
  Then I visualize "Mi nueva página" is not in the list with selector "div.gh-posts-list-item-group"
  And I wait for 2 seconds
