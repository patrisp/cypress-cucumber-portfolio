import { When, Then, Given, After } from 'cypress-cucumber-preprocessor/steps';
import { URL, USER_ACCOUNT } from '../../support/global-var';

let mailinatorInbox = URL.MAILINATOR_URL + USER_ACCOUNT.NEW_USER.split('@', 1);


Given('I am on the "Sign in as developer" page', () => {
    cy.visit(URL.PROFILE_URL + '/login');
});

When('I click on "Register" link', () => {
    cy.get('button').contains('Don\'t have an account? Sign up').click();
});

Then('I am redirected to "Get started" page', () => {
    cy.url().should('eq', URL.PROFILE_URL + '/register');
});

Given('I am on "Get started" page', () => {
    cy.visit(URL.PROFILE_URL + '/register');
});

When('I enter email address', () => {
    cy.get('input[name="email"]').type(USER_ACCOUNT.NEW_USER);
});

When('I enter password', () => {
    cy.get('input[name="password"]').type(USER_ACCOUNT.PASSWORD);
    cy.get('input[name="repeatPassword"]').type(USER_ACCOUNT.PASSWORD);
});

When('I do not accept T&C', () => {
    cy.get('input[name="policy"]').invoke('attr', 'value', 'false');
});

When('I click on \'Create account\' button', () => {
    cy.get('button').contains('Create account').click({force: true});
});

Then('I am not redirected to the next step', () => {
    cy.url().should('eq', URL.PROFILE_URL + '/register');
});

When('I accept T&C', () => {
    cy.get('input[name="policy"]').should('have.attr', 'value', 'false');
    cy.get('input[name="policy"]').check();
});

When('I do not enter password', () => {
    cy.get('input[name="password"]').should('have.attr', 'value', '');
    cy.get('input[name="repeatPassword"]').should('have.attr', 'value', '');
});

When('I do not enter email address', () => {
    cy.get('input[name="email"]').should('have.attr', 'value', '');
});

Then('I am redirected to the next step', () => {
    cy.contains('Thank you for your registration!').should('be.visible');
});

Given('I received the email', () => {
    cy.visit(mailinatorInbox);
    cy.get('[id^="row"]', {timeout: 3000}).eq(0).click();
});

When('I click on the confirmation link', () => {
    cy.get('#pills-links-tab').click();
    cy.get('a[href]').contains('/register/').invoke('attr','target','_self').click();
});

Then('my account is confirmed', () => {
    cy.url().should('contain', 'by-email#success-verification');
    cy.get('div.MuiPaper-elevation').should('contain', 'Your account has been confirmed.');
});

Given('I am on Sign In page', () => {
    cy.visit(URL.PROFILE_URL + '/login' + '/by-email');
});

When('I enter email address and password and click on Sign in button', () => {
    cy.get('input[name="email"]').type(USER_ACCOUNT.NEW_USER);
    cy.get('input[name="password"]').type(USER_ACCOUNT.PASSWORD);
    cy.get('button.MuiButton-sizeLarge').contains('Sign in').click();
});

Then('I am logged in', () => {
    cy.url().should('eq', URL.PROFILE_URL + '/profile');
    cy.get('.MuiTypography-h4').should('contain', 'My profile');
});


