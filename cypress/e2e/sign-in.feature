Feature: Signing in as a user 

    Scenario: Accessing the "Sign-in" page
        Given I am on the website
        When I click on "Sign in" button
        And I click on Sign in to Candidate's profile
        Then I am redirected to Sign in to Candidate's profile page

    Scenario: Logging in with invalid credentials
        Given I am on the Sign in to Candidate's profile page
        When I enter incorrect username and password
        Then "Invalid email or password" message is displayed

    Scenario: Logging in with valid credentials
        Given I am on the Sign in to Candidate's profile page
        When I enter correct username and password
        Then I am logged in as a user