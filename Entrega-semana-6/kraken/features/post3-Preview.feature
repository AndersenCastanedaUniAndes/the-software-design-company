@5.69.0
Feature: Posts previsualizar post

@user1 @web
Scenario: Como usuario administrador quiero previsualizar un post para saber cómo está quedando
  Given I navigate to page "<BASEURL>"
  And I wait for 5 seconds
  And I enter email "<USERNAME>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[type='submit']"
  And I wait for 7 seconds
  When I go to the posts section with selector "a[data-test-nav='posts']"
  And I wait for 1 seconds
  And I click in the new post button with selector "a[data-test-new-post-button]"
  And I wait for 1 seconds
  And I enter title "$name_postTitle" into field with selector "textarea[data-test-editor-title-input]"
  And I wait for 1 seconds
  Then I click in the preview button with selector "button[data-test-button='publish-preview']"
  And I see the preview of the post on a div with selector "div.gh-post-preview-container.gh-post-preview-browser-container"
