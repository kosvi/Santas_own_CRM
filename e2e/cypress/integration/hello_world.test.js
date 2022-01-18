it('Hello World!', function () {
  //  console.log('PORT:', Cypress.env('PORT'));
  //  cy.visit(`${Cypress.env('FULL_HOST')}:${Cypress.env('PORT')}`);
  cy.visit(Cypress.env('web_base'));
  cy.contains('0.0.0');
});

it('Healthcheck works', function () {
  cy.visit(`${Cypress.env('api_base')}/version/health`);
  cy.contains('OK!');
});
