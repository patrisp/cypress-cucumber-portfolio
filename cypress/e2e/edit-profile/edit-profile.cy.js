/// <reference types="Cypress" />

import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { USER_ACCOUNT } from '../../support/global-var';
import { URL } from '../../support/global-var';

Given('I am on my profile page', () => {
    cy.login(USER_ACCOUNT.EXISTING_USER, USER_ACCOUNT.PASSWORD, 'success');
    cy.visit(URL.PROFILE_URL + '/profile');
});

When('I set name to {string}', (name) => {
    cy.wait(5000);
    cy.get('input[name="firstName"]').type('{selectall}{backspace}');
    cy.get('input[name="firstName"]').type(name);
});

When('I set surname to {string}', (surname) => {
    cy.wait(5000);
    cy.get('input[name="lastName"]').type('{selectall}{backspace}');
    cy.get('input[name="lastName"]').type(surname);
    cy.wait(5000);
});

When('I click on Save Changes button', () => {
    cy.get('button[type="submit"]').click();
});

Then('name and surname are updated to {string} and {string}', (name, surname) => {
    cy.get('input[name="firstName"]').should('have.attr', 'value', name);
    cy.get('input[name="lastName"]').should('have.attr', 'value', surname);
});
