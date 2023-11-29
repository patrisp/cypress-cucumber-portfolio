import { When, Then, Given, Before} from 'cypress-cucumber-preprocessor/steps';
import { USER_ACCOUNT } from '../../support/global-var';
import { URL } from '../../support/global-var';

Before(() => {
    cy.intercept({
        method: 'POST',
        url: URL.PROFILE_URL + '/api/justjoinit/authentication/login'
    }).as('login');
});

Given('I am on the website', () => {
    cy.visit('/');
});

When('I click on "Sign in" button', () => {
    cy.get('button').contains('Sign in').click();
});

When('I click on Sign in to Candidate\'s profile', () => {
    cy.get('li[role="menuitem"]').contains('Sign in to Candidate\'s profile').click();
});

Then('I am redirected to Sign in to Candidate\'s profile page', () => {
    cy.url().should('eq', URL.PROFILE_URL + '/login');
});

Given('I am on the Sign in to Candidate\'s profile page', () => {
    cy.visit(URL.PROFILE_URL + '/login/by-email');
});

When('I enter incorrect username and password', () => {
    cy.get('input[name="email"]').type('asdfg@gmail.com');
    cy.get('input[name="password"]').type('asdfghj');
    cy.get('button[type="submit"]').click();
});

Then('"Invalid email or password" message is displayed', () => {
    cy.get('div[datacy="failed-login-via-mail-snack"]').find('p').should('contain', 'Wrong email, password or account not verified.');
});

When('I enter correct username and password', () => {
    cy.get('input[name="email"]').type(USER_ACCOUNT.EXISTING_USER);
    cy.get('input[name="password"]').type(USER_ACCOUNT.PASSWORD);
    cy.get('button[type="submit"]').click();
});

Then('I am logged in as a user', () => {
    cy.url().should('eq', URL.PROFILE_URL + '/profile');
    cy.wait('@login').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
    })
});