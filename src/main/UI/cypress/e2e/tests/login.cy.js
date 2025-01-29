describe('Okta Login Test', () => {
    const loginUrl = 'http://localhost:4200/login'; 
    const username = 'bell188@wgu.edu';       
    const password = 'testingadmin';          
    const fakeUsername = 'fakeuser@example.com';
    const fakePassword = 'FakePassword123!';

    it('should show an error message for fake credentials', () => {

        cy.visit(loginUrl);

        cy.get('#okta-signin-username').type(fakeUsername);
        cy.get('#okta-signin-password').type(fakePassword);

        cy.get('#okta-signin-submit').click();

        cy.get('.o-form-error-container')
            .should('be.visible')
            .and('contain', 'Unable to sign in');

        cy.url().should('include', '/login');
    });

    it('should log in to the Okta application successfully', () => {
        cy.visit(loginUrl);

        cy.get('#okta-signin-username', { timeout: 10000 }).should('be.visible'); 
        cy.get('#okta-signin-password').should('be.visible');                    

        cy.get('#okta-signin-username').type(username);
        cy.get('#okta-signin-password').type(password);

        cy.get('#okta-signin-submit').click();

        cy.url().should('not.include', '/login');
        cy.url().should('include', '/teetimes/search'); 
    });
});