import { santaUser } from '../support/users';

describe('Search tests', function () {

  beforeEach(function () {
    cy.login({ username: santaUser.username, password: santaUser.password });
  });

  it('typing a name lists results', function() {

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

});