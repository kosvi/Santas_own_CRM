import { validateToString } from '../../src/utils/validators';

it('Hello World!', function () {
  //  console.log('PORT:', Cypress.env('PORT'));
  //  cy.visit(`${Cypress.env('FULL_HOST')}:${Cypress.env('PORT')}`);
  cy.visit(validateToString(Cypress.env('web_base')));
  cy.contains('Hello World!');
});
