it('Hello World!', function () {
  //  console.log('PORT:', Cypress.env('PORT'));
  //  cy.visit(`${Cypress.env('FULL_HOST')}:${Cypress.env('PORT')}`);
  cy.visit(Cypress.env('web_base'));
  cy.contains('Hello World!');
});

it('Healthcheck works', function () {
  cy.visit(`${Cypress.env('api_base')}/health`);
  cy.contains('OK!');
});
