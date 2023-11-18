Feature: Posts Visualizar analitica de post

@user1 @web
Scenario: Como usuario administrador quiero ver las analíticas de un post publicado para saber cómo se ha comportado
  And I navigate to page "<BASEURL>"
  And I wait for 5 seconds
  And I enter email "<USERNAME>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 7 seconds
  When I go to the posts section with selector "a[data-test-nav='posts']"
  And I wait for 1 seconds
  And I click in the new post button with selector "a[data-test-new-post-button]"
  And I wait for 1 seconds
  And I enter title "$name_postTitle" into field with selector "textarea[data-test-editor-title-input]"
  And I wait for 1 seconds
  And I click in the Publish button
  And I wait for 1 seconds
  And I click in the Continue, final review button with selector "button[data-test-button='continue']"
  And I wait for 1 seconds
  And I click in the Publish post confirm button with selector "button[data-test-button='confirm-publish']"
  And I wait for 1 seconds
  And I go back to the editor section clicking the editor button with selector "button.gh-publish-back-button"
  And I wait for 1 seconds
  And I go back to the list of posts clicking the posts button with selector "a[data-test-link='posts']"
  And I wait for 1 seconds
  Then I click the analytics button associated to the post "$$name_postTitle"
  And I check the analytics panel opens with selector "div.gh-canvas-header.gh-post-analytics-header"