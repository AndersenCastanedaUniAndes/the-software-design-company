@5.69.0
Feature: login-datos-a-priori

  @user1 @web
  Scenario Outline: Como usuario administrador quiero hacer login con datos a priori para validar el ingreso de datos
    Given I navigate to page "<BASEURL>"
    And I wait for 5 seconds
    And I enter email "<USERNAME>"
    And I wait for 1 seconds
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click sign in button with selector "button[type='submit']"
    And I wait for 7 seconds
    And I wait for 7 seconds
    Then I validate if I am in the dashboard page or I should see an error message if sign in fails

    Examples: Datos a priori
      | USERNAME        | PASSWORD     | COMMENTS                                              |
      | wrongemail      | wrongpass    | invalid email format and wrong password               |
      | #%^&(*&%^&$*    | Qazwsxedc123 | characters not allowed in email  and correct password |
      | admin@mail.com  | #%^&(*&%^&$* | correct email and characters not allowed in password  |
      | 21593046938     | 21593046938  | numbers not allowed in email and password             |
      | admin@mail.com  | Qazwsxedc123 | correct email and password                            |
      | gkarlsson0@t.co | aV6(DB5Z     | incorrect email and password                          |
