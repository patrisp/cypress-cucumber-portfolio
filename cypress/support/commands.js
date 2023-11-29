// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { URL } from './global-var';

Cypress.Commands.add('login', (email, password, result) => {
    cy.request({
        failOnStatusCode: false,
        url: URL.PROFILE_URL + '/api/justjoinit/authentication/login',
        method: 'POST',
        body: {
            'email': email,
            'password': password
        }
    }).then((response) => {
        if(result == 'success') {
            expect(response.status).to.eq(200);
        } else {
            expect(response.status).to.eq(401);
        }
    });
});

Cypress.Commands.add('createAccount', (email, password) => {
    cy.request({
        url: URL.PROFILE_URL + '/api/justjoinit/candidates',
        method: 'POST',
        body: {
            'email': email,
            'password': password,
            'policy': true,
            'marketing': false
        }
    }).then((response) => {
        expect(response.status).to.eq(201);
    });
});

Cypress.Commands.add('confirmAccount', (emailId) => {
    cy.visit(URL.MAILINATOR_URL + emailId);
    cy.get('[id^="row"]', {timeout: 3000}).eq(0).click();
    
    cy.get('#pills-links-tab').click();
    cy.get('a[href]').contains('/register/').invoke('attr','target','_self').click();

    cy.url().should('contain', 'by-email#success-verification');
    cy.get('div.MuiPaper-elevation').should('contain', 'Your account has been confirmed.');
});

Cypress.Commands.add('deleteAccount', (email, password) => {
    cy.login(email, password, 'success').then((response) => {
        let token = response.body.token;
        let userID = response.body.loggedCandidateDto.id;
        return [token, userID];
    }).then(([token, userID]) => {
        cy.request({
            method: 'DELETE',
            url: URL.PROFILE_URL + '/api/justjoinit/candidates/' + userID,
            auth: {
                'bearer': token
            }
        });
    });
});