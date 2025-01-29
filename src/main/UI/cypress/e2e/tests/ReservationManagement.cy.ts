describe('Adding, Editing, Deleting Reservations', () => {
  const url="http://localhost:4200/teetimes/search";

  it('should reserve a tee time reservation', () => {
    cy.visit(url);

    cy.get(".list-card")
      .contains('7:20 PM')
      .click();

    cy.url().should('include', '/checkout');

    cy.get('[formcontrolname="firstName"]').type('John', { force: true });
    cy.get('[formcontrolname="lastName"]').type('Doe', { force: true });
    cy.get('[formcontrolname="email"]').type('test@test.com', { force: true });
    cy.get('[formcontrolname="phone"]').type('1112223333', { force: true });

    cy.get("button")
      .contains("Next")
      .click();

      cy.url().should('include', '/checkout');
      
      cy.get("button")
      .contains("Next")
      .click({ force: true });

      cy.url().should('include', '/checkout');

      cy.get("button")
      .contains("CONFIRM")
      .click({ force: true });

    cy.url().should('include', '/confirmation');
  });
});