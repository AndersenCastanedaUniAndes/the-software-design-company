@5.69.0
Feature: crear-tag-con-colores-hex-datos-a-priori

  @user1 @web
  Scenario Outline: Como usuario administrador quiero agregar un tag asignandole un color con datos a priori para validar el ingreso de datos en los campos de color
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
    When I go to the tags section with selector "a[data-test-nav='tags']"
    And I wait for 1 seconds
    And I click new tag button with selector "a.ember-view.gh-btn.gh-btn-primary"
    And I wait for 1 seconds
    And I enter tag name "<TAG_NAME>" into field with selector "input[id='tag-name']"
    And I wait for 1 seconds
    And I enter tag color "<COLOR>" into field with selector "input[placeholder='15171A'][name='accent-color']"
    And I wait for 1 seconds
    And I click in the save button
    And I wait for 1 seconds
    And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
    And I wait for 1 seconds
    Then I must see the success created "<TAG_NAME>" in the tag list or the confirmation to leave page if tag was not created

    Examples: 
      | BASEURL                              | USERNAME                   | PASSWORD        | TAG_NAME           | COLOR     | COMMENT                                               |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Valid tag name 1   | 123ABC    | # Valid name and valid HEX Color                      |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Valid tag name 2   | 12E5      | # Valid name and less than 6 characters for HEX Color |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Valid tag name 3   | ABCDEF    | # Valid name and 6 valid leters for HEX characters    |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Valid tag name 4   | !/#$()    | # Valid name and special characters                   |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Valid tag name 5   | ABCJHK    | # Valid name and 6 invalid leters                     |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Valid tag name 6   | 123456789 | # Valid name and more than 6 HEX characters           |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Valid tag name 7   | space     | # Valid name and a space in HEX color input text      |
