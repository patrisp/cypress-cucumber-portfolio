Feature: Browsing job offers

Scenario: No filters are set by default
    Given I enter the job search page
    Then all offers are displayed by default

Scenario Outline: Job offers are filtered by location and category
    Given I enter the job search page
    When I set the location to <location> and category to <category>
    Then only <category> offers in <location> are displayed

    Examples:
        |   location        |   category    |
        |   "Warszawa"      |   "Java"      |
        |   "Kraków"        |   "Testing"   |

Scenario: Only remote job offers are displayed when filter is enabled
    Given I enter the job search page
    When I enable the remote filter
    Then offers with full remote option are displayed

