import { adminUser, scoutUser } from '../support/users';

describe('Menu tests', function () {

  before(function () {
    cy.request('POST', `${Cypress.env('api_base')}/reset/full`);
  });

  it('Permission denied is returned is no access allowed', function () {

    // login as elf
    cy.login({ username: scoutUser.username, password: scoutUser.password });
    cy.visit(`${Cypress.env('web_base')}/permissions`);
    // make sure Permission Denied is given
    cy.get('#Content').contains('Access denied');

  });

  it('Groups can be searched with correct priviledges', function() {
    // login as admin
    cy.login({username: adminUser.username, password: adminUser.password});
    cy.visit(`${Cypress.env('web_base')}/permissions`);
    // make sure groups search is rendered and use it to search a group
    cy.get('#searchGroupInput').should('be.visible').type('foo');
    cy.get('button').contains('load').should('be.visible').click();
    // no group should be found with name 'foo'
    cy.get('#groupList').children().should('have.length', 0);
    // now search existing group
    cy.get('#searchGroupInput').clear().type('santa');
    cy.get('button').contains('load').should('be.visible').click();
    cy.get('#groupList').children().should('have.length', 2);
    cy.get('#groupList').contains('santa');
  });

});