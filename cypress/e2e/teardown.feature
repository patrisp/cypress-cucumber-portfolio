Feature: Test teardown

    Deletes test data

    Scenario: User profile is successfully deleted
    When I delete the account
    Then the account no longer exists

    