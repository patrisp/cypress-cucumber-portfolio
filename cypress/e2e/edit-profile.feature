Feature: Editing user profile

Scenario Outline: User updates name and surname on their profile
    Given I am on my profile page
    When I set name to <name>
    And I set surname to <surname>
    And I click on Save Changes button
    Then name and surname are updated to <name> and <surname>

    Examples:
    |   name        |   surname     |
    |   "Jake"      |   "Sullivan"  |
    |   "Żaneta"    |   "Łęcka"     |
