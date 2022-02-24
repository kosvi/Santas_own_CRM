import { adminUser, scoutUser } from '../support/users';

describe('Menu tests', function () {

  before(function () {
    cy.request('POST', `${Cypress.env('api_base')}/reset/full`);
  });

  beforeEach(function () {
    cy.visit(Cypress.env('web_base'));
  });

  it('Non accessible items aren\'t shown in menu', function () {

    // elf has no read access to permissions & people
    cy.login({ username: scoutUser.username, password: scoutUser.password });

    // let's open the menu and see what is inside
    cy.get('#MenuButton').contains('Menu').click();
    cy.get('#MenuItems').contains(scoutUser.name);
    cy.get('#MenuItems').should('not.contain', 'Permissions').and('not.contain', 'People');

    // Let's close the menu
    cy.get('#MenuButton').click();
    cy.get('#MenuItems').should('not.contain', scoutUser.name);

  });

  it('Accessible items show up and are clickable', function () {

    // admin has correct rights to access permissions & people
    cy.login({ username: adminUser.username, password: adminUser.password });

    // let's open the menu now
    cy.get('#MenuButton').contains('Menu').click();
    cy.get('#MenuItems').contains(adminUser.name);
    cy.get('#MenuItems').contains('Permissions');
    cy.get('#MenuItems').contains('People');

    // Finally open permissions
    cy.get('#MenuItems').contains('Permissions').click();
    cy.get('#Content').contains('Add new group');
    // The menu should close 
    cy.get('#MenuItems').should('not.contain', adminUser.name);

  });

});