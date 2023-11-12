Feature: Posts

@user1 @web
Scenario: Como usuario administrador quiero agregar un draft post para después editar su contenido
  Given I navigate to page "<BASEURL>"
  And I wait for 5 seconds
  And I enter email "<USERNAME>"
  And I wait for 2 seconds
  And I enter password "<PASSWORD>"
  And I wait for 2 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 7 seconds
  When I go to the posts section with selector "a[data-test-nav='posts']"
  And I wait for 2 seconds
  And I click in the new post button with selector "a[data-test-new-post-button]"
  And I enter title "$name_postTitle" into field with selector "textarea[data-test-editor-title-input]"
