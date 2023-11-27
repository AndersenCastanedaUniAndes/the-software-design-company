@5.69.0
Feature: Try to create and assing a url to a draft page using a priori data for the URL from table

  @user1 @web
  Scenario Outline: As a user admin, I want to create a draft page with a custom url to been able to add more content later
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
    And I click in the settings button with selector "button[title='Settings']"
    And I wait for 2 seconds
    And I add the "<PAGE_URL>" in the URL field
    And I wait for 2 seconds
    And I click in the settings button with selector "button[title='Settings']"
    And I wait for 5 seconds
    When I go back to the list of pages clicking the pages button
    And I wait for 4 seconds
    And I click in the leave button if is required
    And I wait for 2 seconds
    Then I visualize the page "$$name_title" in the page list
    And I wait for 2 seconds

    Examples:
      | PAGE_URL                                                                                                                                                                                                                                                         | COMMENT                                  |
      | mañana                                                                                                                                                                                                                                                           | # URL using ñ should not be allowed      |
      | uvGsJotqStrHUrmqFIM3VCdRv2nJljIdwUQbNaFQv4t8ow5VoJapHD8RrndLqzQHer023wVAR1jbediGhVvlyCo1i92YXxLdcA96TEH1oSljGyKlvzgnTHxqESkNMgI34YjvKxdmOWnt2ZAq4kwcY1gctEo2tFpoj0buoZi7y4GS1Tx8Y78fkpfO8Sk26FVgQtyN188mTQ1qPGUzXnYLtbzzSRI4o1gkzstowmh9UkO7MPQSyGS1zBml9AhLrtcp | # 256 URL chars long after host          |
      | ******                                                                                                                                                                                                                                                           | # URL using * should not be allowed      |
      | 😎😎😎-😎😎😎😎                                                                                                                                                                                                                                                    | # URL using emojis should not be allowed |
      | !@#$%^&*()                                                                                                                                                                                                                                                       | # URL with special characters            |

