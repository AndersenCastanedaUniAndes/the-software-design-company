@5.69.0
Feature: crear-nuevo-tag-datos-a-priori

  @user1 @web
  Scenario Outline: Como usuario administrador quiero agregar un nuevo tag con datos a priori para validar el ingreso de datos
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
    And I click in the save button
    And I wait for 1 seconds
    And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
    And I wait for 1 seconds
    Then I must see the success created "<TAG_NAME>" in the tag list or the confirmation to leave page if tag was not created

    Examples: 
      | BASEURL                              | USERNAME                   | PASSWORD        | TAG_NAME                                                                                                                                                                                           | COMMENT                                             |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Normal Tag Title                                                                                                                                                                                   | # Normal title                                      |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | !°@()#$%^&*                                                                                                                                                                                        | # Title with special characters                     |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | 🤯🧐😏                                                                                                                                                                                            | # Title with emojis                                 |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | empty                                                                                                                                                                                              | # Empty title                                       | 
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Title that contains HTML tags <h1>Header</h1>                                                                                                                                                      | # Title with HTML tags                              |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. D  | # Exceedingly long title (more than 191 characters) |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculusneses    | # name with max characters (191 characters)         |
      