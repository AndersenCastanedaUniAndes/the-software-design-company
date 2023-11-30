@5.69.0
Feature: post2-AnalyticsPost

  @user1 @web
  Scenario: Como usuario administrador quiero ver las analíticas de un post publicado para saber cómo se ha comportado
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
    And I enter title "$name_draftPostTitle" into field with selector "textarea.gh-editor-title"
    And I wait for 1 seconds
    And I go back to the list of posts clicking the posts button with selector "a[data-test-link='posts']"
    And I wait for 1 seconds
    And I enter title "$name_PublishedPostTitle" into field with selector "textarea.gh-editor-title"
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
    And I click in the new post button with selector "a[href='#/editor/post/']"
    And I wait for 1 seconds
    And I enter title "$name_scheduledPostTitle" into field with selector "textarea.gh-editor-title"
    And I wait for 1 seconds
    And I click in the Publish button
    And I wait for 1 seconds
    And I click in the Right now button
    And I wait for 1 seconds
    And I click in the shedule later button with selector "div.gh-radio"
    And I wait for 1 seconds
    And I click in the Continue, final review button with selector "button[data-test-button='continue']"
    And I wait for 1 seconds
    And I click in the Publish post confirm button with selector "button[data-test-button='confirm-publish']"
    And I wait for 1 seconds
    And I go back to the editor section clicking the editor button with selector "button.gh-publish-back-button"
    Then I  shouldn't see "$$name_PublishedPostTitle" and "$$name_PublishedPostTitle" when filtering by "Drafts" post
