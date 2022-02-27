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

  it('Groups can be searched with correct priviledges', function () {
    // login as admin
    cy.login({ username: adminUser.username, password: adminUser.password });
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

  it('New groups can be added with correct priviledges', function () {
    // login as admin
    cy.login({ username: adminUser.username, password: adminUser.password });
    cy.visit(`${Cypress.env('web_base')}/permissions`);
    // add name for a new group
    cy.get('#newGroupNameInput').should('be.visible').type('new-group');
    // and save it
    cy.get('button').contains('Save').should('be.visible').click();
    // It should appaer in the list
    cy.get('#groupList').children().should('have.length', 2);
    cy.get('#groupList').contains('new-group').click();
    // new group should now be open, let's add a permission
    cy.get('button').contains('add permission').click();
    // it should be seen now
    cy.get('.PermissionTitle').contains('Entries to person');
    cy.get('.PermissionLine').contains('false').click();
    // now false should change to true
    cy.get('.PermissionLine').contains('true');
  });

  it('searching asterisk will return all groups', function () {
    // reset db
    cy.request('POST', `${Cypress.env('api_base')}/reset/full`);
    // login as admin
    cy.login({ username: adminUser.username, password: adminUser.password });
    cy.visit(`${Cypress.env('web_base')}/permissions`);
    // search *
    cy.get('#searchGroupInput').type('*');
    cy.get('button').contains('load').click();
    // All groups should be returned
    cy.get('#groupList').children().should('have.length', 5);
  });

});