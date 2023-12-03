@5.69.0
Feature: update-user-profile-data

  @user1 @web
  Scenario Outline: Como usuario administrador quiero poder actualizar mi informacion de perfil
    Given I navigate to page "<BASEURL>"
    And I wait for 4 seconds
    And I enter email "<USERNAME>"
    And I wait for 1 seconds
    And I enter password "<PASSWORD_USR>"
    And I wait for 1 seconds
    And I click sign in button with selector "button[type='submit']"
    And I wait for 4 seconds
    When I click on profile element with selector "div.gh-user-avatar.relative"
    And I click on my profile button with the selector "a[data-test-nav='user-profile' ]"
    And I click on change password button with selector "#modal-backdrop > section > div.p-8.py-0 > div > div.false.mt-10.grid.grid-cols-1.gap-x-12.gap-y-20.md\:grid-cols-2 > div:nth-child(4) > button"
    And I enter new data "<OLD_PASSWORD>" into field with selector "//label[text()='Old password']/preceding-sibling::input"
    And I enter new data "<NEW_PASSWORD>" into field with selector "//label[text()='New password']/preceding-sibling::input"
    And I enter new data "<NEW_PASSWORD>" into field with selector "//label[text()='Verify password']/preceding-sibling::input"
    And I wait for 2 seconds
    Then I save changes pressing save button with selector "#modal-backdrop > section > div.p-8.py-0 > div > div.false.mt-10.grid.grid-cols-1.gap-x-12.gap-y-20.md\:grid-cols-2 > div:nth-child(4) > button"
    And I wait for 1 seconds
    And I should see the changed done message with selector "button[class='bg-grey-100']" or should see a error message with selector "#modal-backdrop > section > div.p-8.py-0 > div > div.false.mt-10.grid.grid-cols-1.gap-x-12.gap-y-20.md\:grid-cols-2 > div:nth-child(4) > div:nth-child(4) > span"
    And I wait for 3 seconds

    Examples: 
      | PASSWORD_USR        | OLD_PASSWORD        | NEW_PASSWORD    | COMMENT                            |
      | <PASSWORD>          | <PASSWORD>          | empty           | # contraseña vacia                 |
      | <PASSWORD>          | <PASSWORD>          | 1234567890      | # contraseña insegura              |
      | <PASSWORD>          | <PASSWORD>          | aTg_12*         | # contraseña corta                 |
      | <PASSWORD>          | <PASSWORD>          | <PASSWORD>      | # contraseña repetida              |
      | <PASSWORD>          | <PASSWORD>          | Angel_1527*     | # contraseña correcta              |
      | Angel_1527*         | Angel_1527*         | <PASSWORD>      | # contraseña antigua               |
