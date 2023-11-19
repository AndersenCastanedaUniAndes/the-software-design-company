@5.69.0
Feature: Posts modificar post publicado

@user1 @web
Scenario: Como usuario administrador quiero modificar un post ya publicado para después editar su contenido
  Given I navigate to page "<BASEURL>"
  And I wait for 5 seconds
  And I enter email "<USERNAME>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[type='submit']"
  And I wait for 7 seconds
  When I go to the posts section with selector "a[href='#/posts/']"
  And I wait for 1 seconds
  And I click in the new post button with selector "a[href='#/editor/post/']"
  And I wait for 1 seconds
  And I enter title "$name_postTitle" into field with selector "textarea.gh-editor-title"
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
  And I valide post filter is not applied
  And I wait for 1 seconds
  And I click the post in order to edit it "$$name_postTitle"
  And I wait for 1 seconds
  And I enter title "$name_postTitleModified" into field with selector "textarea.gh-editor-title"
  And I wait for 1 seconds
  Then I update the post by clicking the Update button with selector "button[data-test-button='publish-save']"
  And I wait for 1 seconds
  And I go back to the list of posts clicking the posts button with selector "a[data-test-link='posts']"
  And I wait for 1 seconds
  Then I validate that the title of the post was modified successfully with "$$name_postTitleModified"