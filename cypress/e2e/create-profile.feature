Feature: Creating a user profile

Scenario: User is redirected to profile creation page
    Given I am on the "Sign in as developer" page
    When I click on "Register" link
    Then I am redirected to "Get started" page

Scenario: User does not accept Terms and Conditions during profile creation 
    Given I am on "Get started" page
    When I enter email address
    When I enter password
    And I do not accept T&C
    And I click on 'Create account' button
    Then I am not redirected to the next step

Scenario: User does not provide email address during profile creation 
    Given I am on "Get started" page
    When I do not enter email address
    When I enter password
    And I accept T&C
    And I click on 'Create account' button
    Then I am not redirected to the next step

Scenario: User does not provide password during profile creation 
    Given I am on "Get started" page
    When I enter email address
    When I do not enter password
    And I accept T&C
    And I click on 'Create account' button
    Then I am not redirected to the next step

Scenario: User provides email address and accepts Terms and Conditions during profile creation 
    Given I am on "Get started" page
    When I enter email address
    When I enter password
    And I accept T&C
    And I click on 'Create account' button
    Then I am redirected to the next step

Scenario: User is redirected to log in page after account confirmation
    Given I received the email
    When I click on the confirmation link
    Then my account is confirmed


Scenario: User can log in once the account is confirmed
    Given I am on Sign In page
    When I enter email address and password and click on Sign in button
    Then I am logged in
