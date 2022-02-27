// https://docs.cypress.io/guides/references/best-practices
// Should have read this before writing a single Cypress test

import { adminUser } from '../support/users';

describe('People tests', function () {

  // reset DB before starting the test-run
  before(function () {
    cy.request('POST', `${Cypress.env('api_base')}/reset/full`);
  });


  beforeEach(function () {
    // login as admin
    cy.login({ username: adminUser.username, password: adminUser.password });
    cy.visit(`${Cypress.env('web_base')}/people`);
  });

  it('new person can be added', function () {
    // make sure John Doe is not yet printed
    cy.get('.ag-theme-alpine').should('not.contain', 'John Doe');
    // Fill John Doe & his information to form and submit
    cy.get('input[name=name').should('be.visible').type('John Doe');
    cy.get('input[name=birthdate').should('be.visible').type('2010-06-06');
    cy.get('input[name=address').should('be.visible').type('1313 Webfoot Street');
    cy.get('button[type=submit').should('be.visible').click();
    // make sure the name appeared in the list
    cy.get('.ag-theme-alpine').contains('John Doe');
  });

  it('found people is added to the list and can be accessed', function () {
    // search Jane Doe with search
    cy.get('#searchInput').should('be.visible').type('jane doe');
    // after waiting for a moment, the name sould appear in the table
    cy.get('.ag-theme-alpine').contains('Jane Doe');
    cy.contains('View').click();
    cy.contains('Age: 7').should('be.visible');
  });

});