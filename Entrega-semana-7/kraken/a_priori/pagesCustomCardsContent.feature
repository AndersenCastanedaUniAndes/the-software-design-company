@5.69.0
Feature: Try to create a draft page using a priori data to customize the content using different card options

  @user1 @web
  Scenario Outline: As a user admin, I want to create a draft page with different card option to been able to edit the content visibility
    Given I navigate to page "<BASEURL>"
    And I wait for 5 seconds
    And I enter email "<USERNAME>"
    And I wait for 1 seconds
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click sign in button with selector "button[type='submit']"
    And I wait for 7 seconds
    And I go to the pages section
    And I wait for 2 seconds
    And I click in the new page button
    And I wait for 2 seconds
    And I enter title "$name_title" into field with selector "textarea.gh-editor-title"
    And I wait for 2 seconds
    And I click in the add a card button
    And I wait for 2 seconds
    And I click in the card option "<CARD_OPTION>"
    And I wait for 2 seconds
    When I click outside the card
    And I wait for 2 seconds
    Then I visualize the card element displayed "<CARD_OPTION>"
    And I wait for 2 seconds

    Examples:
      | CARD_OPTION    | COMMENT                                                                         |
      | PUBLIC_PREVIEW | # Adds a public preview to control which content is public and which is private |
      | DIVIDER        | # Adds a divider in the content                                                 |
      | CALLOUT        | # Adds a callout in the content to add custom text                              |
      | BUTTON         | # Adds a button in the content to redirect the user outside the content         |
      | YOUTUBE        | # Adds an embeded video from youtube into the page the content                  |
