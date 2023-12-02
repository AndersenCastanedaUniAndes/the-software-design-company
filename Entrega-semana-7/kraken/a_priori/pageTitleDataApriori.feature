@5.69.0
Feature: Try to create a draft page using a priori data for the title from table

  @user1 @web
  Scenario Outline: As a user admin, I want to create a draft page with custom titles to been able to add more content later
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
    And I enter the title "<PAGE_TITLE>" into the page title field
    And I wait for 2 seconds
    When I go back to the list of pages clicking the pages button
    And I wait for 4 seconds
    And I click in the leave button if is required
    And I wait for 2 seconds
    Then I visualize the page "<PAGE_TITLE>" from table in the page list
    And I wait for 2 seconds

    Examples:
      | PAGE_TITLE                                                                                                                                                                                                                                                       | COMMENT                                             |
      |                                                                                                                                                                                                                                                                  | # Empty title                                       |
      | My new Page                                                                                                                                                                                                                                                      | # Normal title                                      |
      | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to a | # Exceedingly long title (more than 255 characters) |
      | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus too  | # Under limit title length (255 characters)         |
      | 😎😎😎😎😎 😎😎😎😎😎                                                                                                                                                                                                                                               | # Title with only emojis                            |
      | My 😎😎😎😎😎 😎😎😎😎😎                                                                                                                                                                                                                                            | # Title combining text and emojis                   |
      | !@#$%^&*()                                                                                                                                                                                                                                                       | # Title with special characters                     |
      | Life is a !@#$%^&*()                                                                                                                                                                                                                                             | # Title with special characters                     |
