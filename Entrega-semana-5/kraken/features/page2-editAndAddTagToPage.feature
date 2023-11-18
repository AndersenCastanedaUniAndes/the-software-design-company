@5.69.0
Feature: Agregar un tag a una página existente

@user1 @web
Scenario: Como usuario administrador quiero agregar un tag a una página para que pueda filtrarse en la búsqueda por tags
  Given I navigate to page "<BASEURL>"
  And I wait for 3 seconds
  And I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click sign in button with selector "button[type='submit']"
  And I wait for 5 seconds
  When I go to the pages section with selector "a[data-test-nav='pages']"
  And I wait for 2 seconds
  And I click in the new page button with selector "a[data-test-new-page-button]"
  And I wait for 2 seconds
  And I enter title "$name_title" into field with selector "textarea[data-test-editor-title-input]"
  And I wait for 2 seconds
  And I go back to the list of pages clicking the pages button with selector "a[data-test-link='pages']"
  And I wait for 2 seconds
  And I click the page in order to edit it "$$name_title"
  And I wait for 2 seconds
  And I click in the settings button with selector "button[title='Settings']"
  And I wait for 2 seconds
  And I click in the tag dropdown with selector "input.ember-power-select-trigger-multiple-input"
  And I wait for 2 seconds
  And I click in the first tag dropdown option with selector "li[data-option-index='0']"
  And I wait for 2 seconds
  And I go back to the list of pages clicking the pages button with selector "a[data-test-link='pages']"
  And I wait for 2 seconds
  And I click in the leave button with selector "button.gh-btn.gh-btn-red"
  And I wait for 2 seconds
  Then I visualize "$$name_title" with "Client" tag in the list with selector "div.gh-posts-list-item-group"
  And I wait for 2 seconds