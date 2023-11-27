@5.69.0
Feature: Try to create a draft page using a priori data to customize the content style using HTML tags

  @user1 @web
  Scenario Outline: As a user admin, I want to create a draft page with styles to been able to add more content later
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
    And I enter the HTML content "<HTML_CONTENT>" in the card
    And I wait for 3 seconds
    When I click outside the card
    And I wait for 3 seconds
    Then I visualize the dom matches the HTML "<HTML_CONTENT>"
    And I wait for 2 seconds

    Examples:
      | CARD_OPTION | HTML_CONTENT                                                                        | COMMENT                                               |
      | HTML        | <div id='myCustomID'><h2>My Title                                                   | # Using ids in the html content                       |
      | HTML        | <div id='😎😎😎😎😎😎'><h2>My Title                                                   | # Using id emojis in the html content                 |
      | HTML        | <div id='!@#$%^&*()'><h2>My Title                                                   | # Using special characters in the html content        |
      | HTML        | <h1 style='font-family: Segoe'>My Title                                             | # Using fonts in the html content                     |
      | HTML        | <div><div id='myDiv'><button style='color: orange' href='www.youtube.com'>My Button | # Creating a button in the html content               |
      | HTML        | <div style='background-color: red'><h1 style='font-size: 12px'>My Title</</         | # Using styles in the HTML content                    |
      | HTML        | Bear                                                                                | # Draws a bear using html and css in the html content |

