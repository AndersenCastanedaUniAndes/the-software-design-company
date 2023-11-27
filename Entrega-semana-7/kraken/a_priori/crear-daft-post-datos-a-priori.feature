@5.69.0
Feature: crear-daft-post-datos-a-priori

  @user1 @web
  Scenario Outline: Como usuario administrador quiero agregar un draft post con datos a priori para validar el ingreso de datos
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
    And I enter title "<POST_TITLE>" into field with selector "textarea.gh-editor-title"
    And I wait for 2 seconds
    And I go back to the list of posts clicking the posts button with selector "a[data-test-link='posts']"
    And I wait for 1 seconds
    Then I should see the post "<POST_TITLE>" in the list of posts or the confirmation modal if the post was not created

    Examples:
      | POST_TITLE                                                                                                                                                                                                                                                       | COMMENT                                             |
      | Title with SQL Injection ' OR '1'='1'; --                                                                                                                                                                                                                        | # Title with potential SQL Injection                |
      | Normal Title                                                                                                                                                                                                                                                     | # Normal title                                      |
      | Title with script <script>alert('XSS')</script>                                                                                                                                                                                                                  | # Title with potential XSS                          |
      | !@#$%^&*()                                                                                                                                                                                                                                                       | # Title with special characters                     |
      | Title with emojis 😃🎉                                                                                                                                                                                                                                           | # Title with emojis                                 |
      | Title with HTML tags <h1>Header</h1>                                                                                                                                                                                                                             | # Title with HTML tags                              |
      | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to a | # Exceedingly long title (more than 255 characters) |
      | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to   | # Under long title (less than 255 characters)       |
