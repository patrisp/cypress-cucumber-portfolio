import { When, Then, Given } from 'cypress-cucumber-preprocessor/steps';
import categoryIds from '../../support/category-ids.json';

Given('I enter the job search page', () => {
    cy.visit('/');
});


Then('all offers are displayed by default', () => {
    cy.url().should('eq', 'https://justjoin.it/');
    cy.get('[class^="css"]').contains('All offers').should('have.css', 'background-color', 'rgb(243, 246, 248)');
});

When('I set the location to {string} and category to {string}', (location, category) => {
    cy.intercept("https://api.justjoin.it/v2/user-panel/offers?categories*", (req) => {
        const modifiedUrl = req.url.replace('perPage=100', 'perPage=10');
        req.url = modifiedUrl;
    }).as("offers");

    cy.wait(3000);
    cy.get('button').contains('Location').click();
    cy.get('form').within(() => {
        cy.get('button').contains(location).click({force: true});
        cy.get('button').contains('Show offers').click();
    });
    cy.get('.MuiBox-root').contains(category).click();
    cy.wait(3000);
});

Then('only {string} offers in {string} are displayed', (category, location) => {
    let locationEncoded = encodeURI(location);
    let categoryId = categoryIds[category]
    
    cy.reload();

    cy.wait('@offers').then((interception) => {
        const request = interception.request;
        const response = interception.response;

        expect(request.url).to.include('city=' + locationEncoded);
        expect(request.url).to.include('categories[]=' + categoryId);
        
        return response;
    }).then((response) => {
        for(let i = 0; i<10; i++) {
            let responseCategory = response.body.data[i].categoryId;
            let responseLocation = response.body.data[i].multilocation;

            expect(responseCategory.toString()).to.equal(categoryId);
            expect(responseLocation.some(obj => Object.values(obj).some(value => String(value).includes(location)))).to.be.true;
        } 
    });
});

When('I enable the remote filter', () => {
    cy.get('.MuiSwitch-input[type="checkbox"]').click({timeout: 2000});
});

Then('offers with full remote option are displayed', () => {
    cy.url().should('contain', 'remote');
    cy.get('div[style="display: block;"]').each(($el) => {
        cy.wrap($el).parent().children().should('contain', 'Fully remote');
    });
});


