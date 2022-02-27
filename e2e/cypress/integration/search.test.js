import { santaUser, scoutUser } from '../support/users';

describe('Search tests', function () {

  // reset DB before starting the test-run
  before(function () {
    cy.request('POST', `${Cypress.env('api_base')}/reset/full`);
  });

  // always start from "home"
  beforeEach(function () {
    cy.visit(Cypress.env('web_base'));
  });

  it('typing a name lists results', function () {

    // login with Santa (has read access to people)
    cy.login({ username: santaUser.username, password: santaUser.password });

    cy.get('#searchInput').should('be.visible').type('all');
    // These are the three names in our default database
    cy.get('#searchResults').contains('Mikko Mallikas');
    cy.get('#searchResults').contains('Maija Mallikas');
    cy.get('#searchResults').should('not.contain', 'Jane Doe');

    // Fill the seach input before clearing
    cy.get('#searchInput').type('AAAAAA');

    // clear search
    cy.get('#searchResults').contains('clear results').click();

    // now search form should be cleared
    cy.get('#searchInput').type('a');
    cy.get('#searchResults').contains('Jane Doe');

  });

  it('search gives no results if no read access', function () {

    // login as 'elf' with no read access to people
    cy.login({ username: scoutUser.username, password: scoutUser.password });

    cy.get('#searchInput').type('all');
    // this returns results if user is allowed to read people-data - now we aren't
    cy.get('#searchResults').should('not.contain', 'Mikko Mallikas');

  });

});