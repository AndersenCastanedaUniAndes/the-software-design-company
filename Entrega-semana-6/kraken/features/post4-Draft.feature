@4.48.9
Feature: Posts Crear Draft post

@user1 @web
Scenario: Como usuario administrador quiero agregar un draft post para después editar su contenido
  Given I navigate to page "<BASEURL>"
  And I wait for 5 seconds
  And I enter email "<USERNAME>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[type='submit']"
  And I wait for 7 seconds
  And I try to remove the new version banner
  And I wait for 2 seconds
  When I go to the posts section with selector "a[href='#/posts/']"
  And I wait for 1 seconds
  And I click in the new post button with selector "a[href='#/editor/post/']"
  And I wait for 1 seconds
  And I enter title "$name_postTitle" into field with selector "textarea.gh-editor-title"
  And I wait for 1 seconds
  And I go back to the list of posts clicking the posts button with selector "a[data-test-link='posts']"
  And I wait for 1 seconds
  And I valide post filter is not applied
  And I wait for 1 seconds
  And I click the post in order to edit it "$$name_postTitle"
  And I wait for 1 seconds
  And I enter title "$name_postTitleModified" into field with selector "textarea.gh-editor-title"
  And I wait for 1 seconds
  And I go back to the list of posts clicking the posts button with selector "a[data-test-link='posts']"
  And I wait for 1 seconds
  Then I validate that the title of the post was modified successfully with "$$name_postTitleModified"
