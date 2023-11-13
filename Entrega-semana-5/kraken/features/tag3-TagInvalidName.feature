Feature: Tag3 crear con nombre invalido
@user3 @web
Scenario: Como usuario administrador quiero ingresar un nombre invalido para luego recibir un mensaje de error en pantalla
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  And I enter email "<USERNAME2>"
  And I wait for 1 seconds
  And I enter password "<PASSWORD2>"
  And I wait for 1 seconds
  And I click sign in button with selector "button[data-test-button='sign-in']"
  And I wait for 7 seconds
  When I go to the tags section with selector "a[data-test-nav='tags']"
  And I wait for 1 seconds
  And I click new tag button with selector "a.ember-view.gh-btn.gh-btn-primary"
  And I wait for 1 seconds
  And I enter title " " into field with selector "input[id='tag-name']"
  And I wait for 1 seconds
  And I click in the save button
  And I wait for 1 seconds
  Then I must see an invalid name error "body > div.gh-app > div > main > section > form > div.gh-main-section > section > div > div:nth-child(1) > div.gh-tag-settings-multiprop > div.form-group.mr2.flex-auto.error > span > p:nth-child(1)"
