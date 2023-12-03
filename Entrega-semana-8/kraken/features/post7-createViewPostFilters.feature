@5.69.0
Feature: post7-CreateViewPostFilters

  @user1 @web
  Scenario Outline: Como usuario administrador quiero crear un filtro personalizado para poder encotrar mi posts facilmente
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
    When I go to the posts section with selector "a[href='#/posts/']"
    And I go posts filtered by "<FILTER_QUERY>"
    Then I create a new view filter
    And I enter title "<POST_FILTER_NAME>" into field with selector "input[data-test-input='custom-view-name']"
    And I save the filter view

    Examples: 
      | FILTER_QUERY                                                         | POST_FILTER_NAME                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | COMMENT                              |
      | type=featured                                                        | Title with SQL Injection ' OR '1'='1'; --                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | # Title with potential SQL Injection |
      | type=featured&visibility=public                                      | Normal Title                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | # Normal title                       |
      | type=featured&visibility=members                                     | Title with script <script>alert('XSS')</script>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | # Title with potential XSS           |
      | type=sent&visibility=members                                         | !@#$%^&*()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | # Title with special characters      |
      | order=published_at%20asc&type=sent&visibility=members                | 🦆🦌💕😂🥰🤗😑🫥😃🎉                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | # Title with emojis                  |
      | author=unknown&order=published_at%20asc&type=sent&visibility=members | Title with HTML tags <h1>Header</h1>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | # Title with HTML tags               |
      | author=unknown&order=published_at%20asc                              | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to a                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | # Very long view name                |
      | order=updated_at%20desc                                              | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to a Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius. Sed non risus. Suspendisse lectus to a | # too much long view name            |