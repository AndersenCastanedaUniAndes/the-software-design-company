Feature: Ver el preview de una página existente

@user1 @web
Scenario: Como usuario administrador quiero dejar de publicar una página nueva para no mostrar más su contenido
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
  And I click in the preview button with selector "button[data-test-button='publish-preview']"
  And I wait for 3 seconds
  Then I visualize the preview page with selector "div.gh-post-preview-container.gh-post-preview-browser-container"
  And I wait for 2 seconds
