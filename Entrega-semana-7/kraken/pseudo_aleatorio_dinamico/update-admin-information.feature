@5.69.0
Feature: update-admin-information

  @user1 @web
  Scenario Outline: Como usuario administrador quiero poder actualizar mi informacion de perfil
    Given I make a GET request to "kraken.json?key=574f7720"
    And the response status should be 200
    And I navigate to page "<BASEURL>"
    And I wait for 5 seconds
    And I enter email "<USERNAME>"
    And I wait for 1 seconds
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click sign in button with selector "button[type='submit']"
    And I wait for 7 seconds
    When I click on element with selector "div.gh-user-avatar.relative"
    And I click on my profile button with selector "a[data-test-nav='user-profile' ]"
    And I enter location "<ADMIN_LOCATION>" with selector "//label[text()='Location']/preceding-sibling::input"
    And I enter location "<ADMIN_WEBSITE_PROFILE>" with selector "//label[text()='Website']/preceding-sibling::input"
    And I enter location "<ADMIN_BIO>" with selector "//label[text()='Bio']/preceding-sibling::textarea"
    And I wait for 2 seconds
    Then I save changes pressing button with selector "button.cursor-pointer.bg-black"
    And I wait for 1 seconds
    And I should see the done button with selector "data-testid='exit-settings'" or should not see a error message with selector "div[data-testid='toast-error']"
    And I wait for 5 seconds

    Examples: 
      | ADMIN_LOCATION | ADMIN_WEBSITE_PROFILE | ADMIN_BIO | COMMENT                             |
      | exceedLocation |                       |           | # exceeding location allowed length |
      |                | MACAddressProfile     |           | # incorrect values  for profile URL |
      |                |                       | longBio   | # exceeed long test for Bio         |
      |                |                       | shortBio  | # correct Bio                       |
      | location       |                       |           | # correct location                  |
      |                | profile               |           | # correct website                   |
