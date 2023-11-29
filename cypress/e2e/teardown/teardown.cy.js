import { When, Then } from "cypress-cucumber-preprocessor/steps";
import { USER_ACCOUNT } from "../../support/global-var";
import { URL } from "../../support/global-var";

When('I delete the account', () => {
    cy.deleteAccount(USER_ACCOUNT.NEW_USER, USER_ACCOUNT.PASSWORD);
});

Then('the account no longer exists', () => {
    cy.clearCookies();
    cy.login(USER_ACCOUNT.NEW_USER, USER_ACCOUNT.PASSWORD, 'fail');
    /*
    cy.request({
        failOnStatusCode: false,
        url: URL.PROFILE_URL + '/api/justjoinit/authentication/login',
        method: 'POST',
        body: {
            'email': USER_ACCOUNT.NEW_USER,
            'password': USER_ACCOUNT.PASSWORD
        }
    }).then((response) => {
        expect(response.status).to.eq(401);
    });
    */
});