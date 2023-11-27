@5.69.0
Feature: crear-nuevo-tag-meta-data-datos-a-priori

  @user1 @web
  Scenario Outline: Como usuario administrador quiero agregar un nuevo tag añadiendo meta data con datos a priori para validar el ingreso de datos
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
    When I go to the tags section with selector "a[data-test-nav='tags']"
    And I wait for 1 seconds
    And I click new tag button with selector "a.ember-view.gh-btn.gh-btn-primary"
    And I wait for 1 seconds
    And I enter tag name "<TAG_NAME>" into field with selector "input[id='tag-name']"
    And I wait for 1 seconds
    And I expand section with selector "body > div.gh-app > div > main > section > form > section > div:nth-child(1) > div.gh-expandable-header > button"
    And I wait for 1 seconds
    And I enter data "<META_TITLE>" into field with selector "#meta-title"
    And I wait for 1 seconds
    And I enter data "<META_DESCRIPTION>" into field with selector "#meta-description"
    And I wait for 1 seconds
    And I enter data "<META_URL>" into field with selector "#canonical-url"
    And I wait for 1 seconds
    And I click in the save button
    And I wait for 1 seconds
    And I go back to the tags section clicking the tags button with selector "a[data-test-nav='tags']"
    And I wait for 1 seconds
    Then I must see the success created "<TAG_NAME>" in the tag list or the confirmation to leave page if tag was not created

    Examples: 
      | BASEURL                              | USERNAME                   | PASSWORD        | TAG_NAME           | META_TITLE | META_DESCRIPTION | META_URL | COMMENT                                    |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Sophie Rodriguez   | Christopher-Montgomery-Fitzgerald-Harrington-Sutherland-Smith-Luxemburg | An immersive journey through history, art, and culture, unraveling the intricacies of ancient civilizations and their enduring legacies in today's world life. | ww.invalid.to | # All meta data is wrong |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Ethan Patel        | Constantinople-Thessaloniki-Railway-Company-of-the-19th-Century-associate | An innovative solution designed to streamline workflow efficiency and enhance productivity across diverse industries. | http://www.url.com/example | # Too long title |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Isabella Chang     | Forgotten-Realms | An intricately woven tale of love, loss, and redemption set against the backdrop of a sprawling metropolis, where characters navigate life's complexities challenges. | https://www.example.com | # Too long Description |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Liam Khan          | Echoes-Destiny | A captivating narrative exploring the depths of human emotion and resilience in the face of adversity. | 3545.com | # Invalid URL |
      | http://localhost:2368/ghost/#/signin | a.menesess@uniandes.edu.co | *93ZPspkZVHtS.d | Olivia Nguyen      | TagMeta | TagMeta provides essential information for organizing and optimizing website content. | htps://www.tag-meta.com | # All meta data valid |
      