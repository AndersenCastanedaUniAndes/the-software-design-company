@5.69.0
Feature: update-user-profile-data

  @user1 @web
  Scenario Outline: Como usuario administrador quiero poder actualizar mi informacion de perfil
    Given I navigate to page "<BASEURL>"
    And I wait for 4 seconds
    And I enter email "<USRNAME>"
    And I wait for 1 seconds
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click sign in button with selector "button[type='submit']"
    And I wait for 4 seconds
    When I click on profile element with selector "div.gh-user-avatar.relative"
    And I click on my profile button with the selector "a[data-test-nav='user-profile' ]"
    And I enter new data "<FULL_NAME>" into field with selector "//label[text()='Full name']/preceding-sibling::input"
    And I enter new data "<EMAIL>" into field with selector "//label[text()='Email']/preceding-sibling::input"
    And I enter new data "<SLUG_NAME>" into field with selector "//label[text()='Slug']/preceding-sibling::input"
    And I wait for 2 seconds
    Then I save changes pressing save button with selector "button.cursor-pointer.bg-black"
    And I wait for 1 seconds
    And I should see the profile done button with selector "data-testid='exit-settings'" or should not see a error message with selector "div[data-testid='toast-error']"
    And I wait for 3 seconds

    Examples: 
      |  USRNAME             | FULL_NAME                                                                                                                                                                                                 | EMAIL                 | SLUG_NAME | COMMENT                            |
      | <USERNAME>           | empty                                                                                                                                                                                                     | _                     | _         | # nombre vacio                     |
      | <USERNAME>           | !°@()#$%^&*                                                                                                                                                                                               | _                     | _         | # nombre con caracteres especiales |
      | <USERNAME>           | 🤯🧐😏🧐                                                                                                                                                                                                | _                     | _         | # nombre con emojis                |
      | <USERNAME>           | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus giant mustache | _                     | _         | # Nombre muy largo                 |
      | <USERNAME>           | Luis Alberto Suarez Saenz                                                                                                                                                                                 | _                     | _         | # Nombre correcto                  |
      | <USERNAME>           | _                                                                                                                                                                                                         | empty                 | _         | # email vacio                      |
      | <USERNAME>           | _                                                                                                                                                                                                         | userexample@mail      | _         | # email invalido                   |
      | <USERNAME>           | _                                                                                                                                                                                                         | userexample@mail.com  | _         | # email correcto                   |
      | userexample@mail.com | _                                                                                                                                                                                                         | <USERNAME>            | _         | # cambio a email anterior          |      
      | <USERNAME>           | _                                                                                                                                                                                                         | _                     | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus giant mustache | # slug name largo |
      | <USERNAME>           | _                                                                                                                                                                                                         | _                     | usertest  | # slug name correcto               |
