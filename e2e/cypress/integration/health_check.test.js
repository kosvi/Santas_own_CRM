describe('Healthcheck tests', function () {

  it('Healthcheck works', function () {
    cy.visit(`${Cypress.env('api_base')}/version/health`);
    cy.contains('OK!');
  });

});