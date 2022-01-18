it('Version responds!', function () {
  //  console.log('PORT:', Cypress.env('PORT'));
  //  cy.visit(`${Cypress.env('FULL_HOST')}:${Cypress.env('PORT')}`);
  cy.visit(Cypress.env('web_base'));
  cy.contains('version');
});

it('Healthcheck works', function () {
  cy.visit(`${Cypress.env('api_base')}/version/health`);
  cy.contains('OK!');
});
