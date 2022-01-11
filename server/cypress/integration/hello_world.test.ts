import { validateToString } from '../../src/utils/validators';

it('Hello World!', function () {
  //  console.log('PORT:', Cypress.env('PORT'));
  //  cy.visit(`${Cypress.env('FULL_HOST')}:${Cypress.env('PORT')}`);
  cy.visit(validateToString(Cypress.env('testhost')));
  cy.contains('Hello World!');
});
