@5.69.0
Feature: crear-internal-tag-face-card-datos-a-priori

  @user1 @web
  Scenario Outline: Como usuario administrador quiero agregar un internal tag añadiendo facebook cards con datos a priori para validar el ingreso de datos
    Given I navigate to page "<BASEURL>"
    And I wait for 5 seconds
    And I enter email "<USERNAME>"
    And I wait for 1 seconds
    And I enter password "<PASSWORD>"
    And I wait for 1 seconds
    And I click sign in button with selector "button[type='submit']"
    And I wait for 4 seconds
    And I try to remove the new version banner
    And I wait for 2 seconds
    And I go to the tags section with selector "a[data-test-nav='tags']"
    And I wait for 1 seconds
    When I go to internal tags section with selector "button[data-test-tags-nav='internal']"
    And I wait for 1 seconds
    And I click new tag button with selector "a.ember-view.gh-btn.gh-btn-primary"
    And I wait for 1 seconds
    And I enter internal title "<TAG_NAME>" into field with selector "input[id='tag-name']"
    And I wait for 1 seconds
    And I expand section with selector "body > div.gh-app > div > main > section > form > section > div:nth-child(3) > div.gh-expandable-header > button"
    And I wait for 1 seconds
    And I enter data "<FACE_TITLE>" into field with selector "#og-title"
    And I wait for 1 seconds
    And I enter data "<FACE_DESCRIPTION>" into field with selector "#og-description"
    And I wait for 1 seconds
    And I click in the save button
    And I wait for 1 seconds
    And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
    And I wait for 1 seconds
    Then I validate that the element "<TAG_NAME>" is present in the list

    Examples: 
      | BASEURL                              | USERNAME                   | PASSWORD        | TAG_NAME           | FACE_TITLE | FACE_DESCRIPTION |  COMMENT                                    |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Emma Thompson      | The Last Samurai | An epic tale of honor and redemption set in feudal Japan. | # All facebook data is correct |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Liam Cooper        | Explorations in the Uncharted Realms of Quantum Mechanics: A Comprehensive Study on Heavy Particle Duality | An innovative solution designed to stream workflow efficiency. | # Too long title |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Jose Schmit        | Pirates of the Caribbean | An intricately woven tale of love, loss, and redemption set against the backdrop of a sprawling metropolis. | # Too long Description |

