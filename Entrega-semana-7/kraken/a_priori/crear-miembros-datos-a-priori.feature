@5.69.0
Feature: crear-miembros-datos-a-priori

  @user1 @web
  Scenario Outline: Como usuario administrador quiero poder registrar un nuevo miembro para poder enviarles novedades
    Given I navigate to page "<BASEURL>"
    And I wait for 5 seconds
    And I enter email "<USERNAME>"
    And I wait for 2 seconds
    And I enter password "<PASSWORD>"
    And I wait for 2 seconds
    And I click sign in button with selector "button[type='submit']"
    And I wait for 4 seconds
    And I try to remove the new version banner
    And I wait for 2 seconds
    When I go to the members section with selector "a[href='#/members/']"
    And I wait for 2 seconds
    And I click in the new member button with selector "a[href='#/members/new/']"
    And I wait for 2 seconds
    And I enter a name "<MEMBER_NAME>" into a field with selector "member-name"
    And I wait for 1 seconds
    And I enter an email "<MEMBER_EMAIL>" into a field with selector "member-email"
    And I wait for 1 seconds
    And I enter a label "<MEMBER_LABEL>" into a field with selector "input.ember-power-select-trigger-multiple-input"
    And I wait for 1 seconds
    Then I try to save the member by pressing the save button ".view-actions button"
    And I wait for 2 seconds
    And I go to the members section with selector "a[href='#/members/']"
    And I wait for 2 seconds
    And I must see the member "<MEMBER_NAME>" or "<MEMBER_EMAIL>" listed in the members list section "a[data-test-table-data='details']" or the confirmation modal if the member was not created

    Examples: 
      | BASEURL                              | USERNAME       | PASSWORD     | MEMBER_NAME                                                                                                                                                                                      | MEMBER_EMAIL          | MEMBER_LABEL                                                                                                                                                                                     | COMMENTS                                           |
      | http://localhost:3001/ghost/#/signin | admin@mail.com | Qazwsxedc123 | Test User 3                                                                                                                                                                                      | test.user3@mail.com   | space                                                                                                                                                                                            | correct name and email, space as label not allowed |
      | http://localhost:3001/ghost/#/signin | admin@mail.com | Qazwsxedc123 | blank                                                                                                                                                                                            | empty.name@mail.com   | # empty name                                                                                                                                                                                     | empty name, correct email and label                |
      | http://localhost:3001/ghost/#/signin | admin@mail.com | Qazwsxedc123 | upper limit label                                                                                                                                                                                | upper.limit1@mail.com | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maece | Exceedingly long label (more than 191 characters)  |
      | http://localhost:3001/ghost/#/signin | admin@mail.com | Qazwsxedc123 | lower limit label                                                                                                                                                                                | lower.limit1@mail.com | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Mae   | Under long label (less than 191 characters)        |
      | http://localhost:3001/ghost/#/signin | admin@mail.com | Qazwsxedc123 | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maece | upper.limit2@mail.com | exiceed long name                                                                                                                                                                                | Exceedingly long name (more than 191 characters)   |
      | http://localhost:3001/ghost/#/signin | admin@mail.com | Qazwsxedc123 | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Mae   | lower.limit2@mail.com | under long name                                                                                                                                                                                  | Under long name (less than 191 characters)         |
