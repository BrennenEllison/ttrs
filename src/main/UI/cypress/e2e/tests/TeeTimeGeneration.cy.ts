describe('Tee-Time Generation and Search Test', () => {
  const url="http://localhost:4200/teetimes/search";
  const filterUrl="http://localhost:4200/teetimes/search/2/0/2025-01-05T07:00:00/2025-01-05T15:30:00"

  it('should populate a list of tee-times', () => {
    cy.visit(url);

    cy.get("app-tee-time-list");
    cy.get(".list-card");
  })

  it('should populate a list of tee-times with search filters', () => {
    cy.visit(filterUrl);

    cy.get("app-tee-time-list");
    cy.get(".list-card");
  })
});