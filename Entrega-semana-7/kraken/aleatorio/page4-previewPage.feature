@5.69.0
Feature: page4-previewPage

@user1 @web
Scenario: Como usuario administrador quiero ver el preview de una página para observar la apariencia y presentación de su contenido
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
  And I click in the page preview button
  And I wait for 3 seconds
  Then I visualize the page preview
  And I wait for 2 seconds
