it('Hello World!', function () {
  cy.visit('http://localhost:3000');
  cy.contains('Hello World!');
});
